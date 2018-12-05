import { parse } from 'node-html-parser';
import * as _ from 'lodash';
const request = require('request');

export default class GetInstagramPosts {
    html: string
    url: string

    constructor( username ) {
        this.url = `https://www.instagram.com/${username}` //url.replace('http:','https:');
    }
    request() {
        let _this = this
        return new Promise( (resolve,reject) => {
            request.get( _this.url, (err,response,body)=> {
                _this.html = body
                resolve( _this.get() )
            })
        })
    }
    setHTML( html ) {
        this.html = html
    }
    get() {
        var posts = []
        let dom = this.parseHTML(this.html);
        let scripts = this.extractScripts(dom);

        if( scripts && scripts.length > 0 ) {
            let script = this.findDataScript(scripts);
            let json = this.extractJson(script);
            posts = this.extractPosts(json);
        }
        
        return posts;
    }
    parseHTML(html) {
        if (html && typeof (html) === 'string') {
            // @ts-ignore: 3rd part module type error
            return parse(html, { 'script': true });
        }
        else {
            return null;
        }
    }
    extractScripts(dom) {
        if (dom) {
            return dom.querySelectorAll('script');
        }
        else {
            return null;
        }
    }
    findDataScript(scripts) {
        for (var i = 0; i < scripts.length; i++) {
            let script = scripts[i];
            let content = script.text;
            if (content.indexOf('window._sharedData') >= 0) {
                return content;
            }
        }
    }
    extractJson(script) {
        let lines = script.split('\n');
        for (var l = 0; l < lines.length; l++) {
            let line = lines[l];
            if (line.indexOf('window._sharedData =') >= 0) {
                let json = line.slice(21, -1);
                try {
                    return JSON.parse(json);
                }
                catch (e) {
                    return null;
                }
            }
        }
    }
    extractPosts(json) {
        if (
            json && 
            json.entry_data && 
            json.entry_data.ProfilePage && 
            json.entry_data.ProfilePage[0] && 
            json.entry_data.ProfilePage[0].graphql &&
            json.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges
            ) {
            let edges = json.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges
            let posts = (edges||[]).map( (e) => {
                return {
                    caption: getContent(e.node.edge_media_to_caption.edges),
                    image: e.node.display_url,
                    link: `https://www.instagram.com/p/${e.node.shortcode}/`,
                    is_video: e.node.is_video,
                    timestamp: (e.node.taken_at_timestamp * 1000)
                }
            })
            return posts;
        }
        else {
            return [];
        }

        function getContent( edges ) {
            if( edges && edges[0] && edges[0].node && edges[0].node.text) {
                return edges[0].node.text
            } else {
                return null
            }
        }
    }
}