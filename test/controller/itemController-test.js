/*jslint node: true */
"use strict";

var request = require('supertest');
var expect = require('chai').expect;
var sinon = require('sinon');
var app = require('../../app/app.js');

var db = require('../../app/db.js').get();
var mockdb = require('../mock-db.js');

describe('Item Controller', function() {

    before(function() {
        // mock database 
        var dbStub = sinon.stub(db, "collection", mockdb.collection);
    });

    it('should have express application', function() {
        expect(app).to.not.be.undefined;
        expect(app).to.exist;
    });

    describe('New orders', function() {

        it('should create new item');

    });

    describe('Retrieve items', function() {
        it('should retireve all items on GET api/items', function(done) {
            request(app)
                .get('/api/items')
                .expect(200)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res.body.links.self).to.be.equal('/api/items');
                    expect(res.body.payload).to.be.an('array');
                    expect(res.body.payload).to.have.length(10);
                    done();
                });
        });

        it('should retrieve single item on GET api/items/:itemId');

        it('should retrieve single item on GET api/items/:itemId/:property');
    });

    describe('Remove order', function() {

        it('should remove an existing item');

    });

    after('restore database mock', function() {
        db.collection.restore();
    });
});