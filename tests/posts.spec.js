"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var chai_1 = require("chai");
require("mocha");
var index_1 = require("../index");
var html;
describe('GET Instagram Posts', function () {
    it('Extract posts - profile with posts', function () {
        var doc = fs.readFileSync(__dirname + "/fixtures/profile.html", { 'encoding': 'utf8' });
        var instagramGetPosts = new index_1.default('instagram');
        instagramGetPosts.setHTML(doc);
        var posts = instagramGetPosts.get();
        chai_1.expect(posts.length).to.equal(12);
    });
    it('Extract posts - proile with no posts', function () {
        var doc = fs.readFileSync(__dirname + "/fixtures/no-posts.html", { 'encoding': 'utf8' });
        var instagramGetPosts = new index_1.default('instagram');
        instagramGetPosts.setHTML(doc);
        var posts = instagramGetPosts.get();
        chai_1.expect(posts.length).to.equal(0);
    });
});
//# sourceMappingURL=posts.spec.js.map