/*jslint node: true */
"use strict";

var request = require('supertest');
var expect = require('chai').expect;
var sinon = require('sinon');
var app = require('../../app/app.js');

var db = require('../../app/db.js').get();
var mockdb = require('../mock-db.js');

describe('Report Controller', function() {

    before(function() {
        // mock database 
        var dbStub = sinon.stub(db, "collection", mockdb.collection);
    });

    it('should have express application', function() {
        expect(app).to.not.be.undefined;
        expect(app).to.exist;
    });

    describe('Item orders', function() {

        it('should get how often each item has been ordered', function(done) {
            request(app)
            .get('/api/reports/items')
            .expect(200)
            .end(function(err, res) {
                expect(res.body).to.not.be.undefined;
                expect(res.body.links.self).to.be.equal('/api/reports/items');
                expect(res.body.payload).to.be.an('array');
                expect(res.body.payload[0]).to.be.an('object');
                expect(res.body.payload[0]._id).to.be.equal("Inline Skates");
                done();
            });
        });

    });

    after('restore database mock', function() {
        db.collection.restore();
    });
});