/*jslint node: true */
"use strict";

var request = require('supertest');
var expect = require('chai').expect;
var sinon = require('sinon');
var app = require('../../app/app.js');

var db = require('../../app/db.js').get();
var mockdb = require('../mock-db.js');

describe('Order Controller', function() {

    before(function() {
        // mock database 
        var dbStub = sinon.stub(db, "collection", mockdb.collection);
    });

    it('should have express application', function() {
        expect(app).to.not.be.undefined;
        expect(app).to.exist;
    });

    describe('New orders', function() {

        it('should create new order', function(done) {
            request(app)
                .post('/api/orders')
                .send({
                    orderId: '009',
                    company: 'test co',
                    address: 'test st. 102',
                    item: 'iPad'
                })
                .expect(200)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res.body.links.self).to.be.equal('/api/orders');
                    expect(res.body.payload).to.be.an('object');
                    expect(res.body.payload).to.have.property('orderId');
                    done();
                });
        });

    });

    describe('Retrieve orders', function() {
        it('should retireve all orders on GET api/orders', function(done) {
            request(app)
                .get('/api/orders')
                .expect(200)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res.body.links.self).to.be.equal('/api/orders');
                    expect(res.body.payload).to.be.an('array');
                    expect(res.body.payload).to.have.length(8);
                    done();
                });
        });

        it('should retireve all orders for an address on GET api/orders?address=', function(done) {
            request(app)
                .get('/api/orders?address=Steindamm%2080')
                .expect(200)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res.body).to.not.be.undefined;
                    expect(res.body.links.self).to.be.equal('/api/orders?address=Steindamm%2080');
                    expect(res.body.payload).to.be.an('array');
                    expect(res.body.payload).to.have.length(2);
                    done();
                });
        });

        it('should retireve all orders for a company on GET api/orders?company=', function(done) {
            request(app)
                .get('/api/orders?company=SuperTrader')
                .expect(200)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res.body).to.not.be.undefined;
                    expect(res.body.links.self).to.be.equal('/api/orders?company=SuperTrader');
                    expect(res.body.payload).to.have.length(4);
                    done();
                });
        });

        it('should retrieve single order on GET api/orders/:orderId');

        it('should retrieve single order on GET api/orders/:orderId/:property');
    });

    describe('Remove order', function() {

        it('should remove an existing order', function(done) {
                request(app)
                    .del('/api/orders/001')
                    .expect(200)
                    .end(function(err, res) {
                        expect(err).to.be.null;
                        expect(res.body).to.not.be.undefined;
                        expect(res.body.links.self).to.be.equal('/api/orders/001');
                        expect(res.body.payload.success).to.be.equal(true);
                        done();
                    });
            });

    });

    after('restore database mock', function() {
        db.collection.restore();
    });
});