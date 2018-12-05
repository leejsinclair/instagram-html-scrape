"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_html_parser_1 = require("node-html-parser");
var request = require('request');
var GetInstagramPosts = /** @class */ (function () {
    function GetInstagramPosts(username) {
        this.url = "https://www.instagram.com/" + username; //url.replace('http:','https:');
    }
    GetInstagramPosts.prototype.request = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            request.get(_this.url, function (err, response, body) {
                _this.html = body;
                resolve(_this.get());
            });
        });
    };
    GetInstagramPosts.prototype.setHTML = function (html) {
        this.html = html;
    };
    GetInstagramPosts.prototype.get = function () {
        var posts = [];
        var dom = this.parseHTML(this.html);
        var scripts = this.extractScripts(dom);
        if (scripts && scripts.length > 0) {
            var script = this.findDataScript(scripts);
            var json = this.extractJson(script);
            posts = this.extractPosts(json);
        }
        return posts;
    };
    GetInstagramPosts.prototype.parseHTML = function (html) {
        if (html && typeof (html) === 'string') {
            // @ts-ignore: 3rd part module type error
            return node_html_parser_1.parse(html, { 'script': true });
        }
        else {
            return null;
        }
    };
    GetInstagramPosts.prototype.extractScripts = function (dom) {
        if (dom) {
            return dom.querySelectorAll('script');
        }
        else {
            return null;
        }
    };
    GetInstagramPosts.prototype.findDataScript = function (scripts) {
        for (var i = 0; i < scripts.length; i++) {
            var script = scripts[i];
            var content = script.text;
            if (content.indexOf('window._sharedData') >= 0) {
                return content;
            }
        }
    };
    GetInstagramPosts.prototype.extractJson = function (script) {
        var lines = script.split('\n');
        for (var l = 0; l < lines.length; l++) {
            var line = lines[l];
            if (line.indexOf('window._sharedData =') >= 0) {
                var json = line.slice(21, -1);
                try {
                    return JSON.parse(json);
                }
                catch (e) {
                    return null;
                }
            }
        }
    };
    GetInstagramPosts.prototype.extractPosts = function (json) {
        if (json &&
            json.entry_data &&
            json.entry_data.ProfilePage &&
            json.entry_data.ProfilePage[0] &&
            json.entry_data.ProfilePage[0].graphql &&
            json.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges) {
            var edges = json.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges;
            var posts = (edges || []).map(function (e) {
                return {
                    caption: getContent(e.node.edge_media_to_caption.edges),
                    image: e.node.display_url,
                    link: "https://www.instagram.com/p/" + e.node.shortcode + "/",
                    is_video: e.node.is_video,
                    timestamp: (e.node.taken_at_timestamp * 1000)
                };
            });
            return posts;
        }
        else {
            return [];
        }
        function getContent(edges) {
            if (edges && edges[0] && edges[0].node && edges[0].node.text) {
                return edges[0].node.text;
            }
            else {
                return null;
            }
        }
    };
    return GetInstagramPosts;
}());
exports.default = GetInstagramPosts;
//# sourceMappingURL=index.js.map