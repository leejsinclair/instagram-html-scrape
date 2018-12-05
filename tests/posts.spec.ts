const fs = require('fs')
import { expect } from 'chai';
import 'mocha';

import GetInstagramPosts from '../index'
var html

describe('ALLOCATE', () => {

    before((done) => {
        fs.readFile(`${__dirname}/fixtures/profile.html`, { 'encoding': 'utf8'}, (err,doc) => {
            if(!err) {
                html = doc;
                done();
            }
        })
    });

    it('Extract posts', () => {
        const instagramGetPosts = new GetInstagramPosts('instagram');
        instagramGetPosts.setHTML(html)
        
        let posts = instagramGetPosts.get();
        
        expect(posts.length).to.equal(12);
    })
});