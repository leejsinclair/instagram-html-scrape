"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var chai_1 = require("chai");
require("mocha");
var get_posts_1 = require("../modules/get-posts");
var html;
describe('ALLOCATE', function () {
    before(function (done) {
        fs.readFile(__dirname + "/fixtures/profile.html", { 'encoding': 'utf8' }, function (err, doc) {
            if (!err) {
                html = doc;
                done();
            }
        });
    });
    it('Extract posts', function () {
        var instagramGetPosts = new get_posts_1.default('instagram');
        instagramGetPosts.setHTML(html);
        var posts = instagramGetPosts.get();
        chai_1.expect(posts.length).to.equal(12);
    });
});
//# sourceMappingURL=posts.spec.js.map