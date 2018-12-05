const fs = require('fs')
import { expect } from 'chai';
import 'mocha';

import GetInstagramPosts from '../index'
var html

describe('GET Instagram Posts', () => {

    it('Extract posts - profile with posts', () => {
        let doc = fs.readFileSync(`${__dirname}/fixtures/profile.html`, { 'encoding': 'utf8' })
        const instagramGetPosts = new GetInstagramPosts('instagram');
        instagramGetPosts.setHTML(doc)

        let posts = instagramGetPosts.get();

        expect(posts.length).to.equal(12);
    })

    it('Extract posts - proile with no posts', () => {
        let doc = fs.readFileSync(`${__dirname}/fixtures/no-posts.html`, { 'encoding': 'utf8' })
        const instagramGetPosts = new GetInstagramPosts('instagram');
        instagramGetPosts.setHTML(doc)

        let posts = instagramGetPosts.get();

        expect(posts.length).to.equal(0);
    })



});