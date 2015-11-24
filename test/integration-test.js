/*jslint node: true */
"use strict";

var request = require('supertest');
var expect = require('chai').expect;
var app = require('../app/app.js');
var db = require('../app/db.js');

describe('Integration Test', function() {

    before(function(done) {
        this.timeout(4000);
        db.connect(function() {
            done();
        });
    });

    it('should have app object', function() {
        expect(app).to.not.be.undefined;
        expect(app).to.exist;
    });

    describe("Orders", function() {

        describe('New orders', function() {

            it('should create new order', function(done) {
                request(app)
                    .post('/api/orders')
                    .send({
                        orderId: '0099',
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

        describe("Retrieve order", function() {
            it('should have orders collection', function(done) {
                var orders = db.get().collection('orders');
                expect(orders).to.not.be.undefined;
                expect(orders).to.be.an('object');
                expect(orders).to.have.property('find');
                done();
            });

            it('should retireve all orders on GET api/orders', function(done) {
                request(app)
                    .get('/api/orders')
                    .expect(200)
                    .end(function(err, res) {
                        expect(err).to.be.null;
                        expect(res.body.links.self).to.be.equal('/api/orders');
                        expect(res.body.payload).to.be.an('array');
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
                        expect(res.body.payload).to.be.an('array');
                        done();
                    });
            });
        });

        describe("Remove order", function() {

            it('should remove an existing order', function(done) {
                request(app)
                    .del('/api/orders/0099')
                    .expect(200)
                    .end(function(err, res) {
                        expect(err).to.be.null;
                        expect(res.body).to.not.be.undefined;
                        expect(res.body.links.self).to.be.equal('/api/orders/0099');
                        expect(res.body.payload.success).to.be.equal(true);
                        done();
                    });
            });

        });
    });

    describe('Items', function() {
        it('should retrieve all items on GET api/items', function(done) {
            request(app)
                .get('/api/items')
                .expect(200)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res.body).to.not.be.undefined;
                    expect(res.body.links.self).to.be.equal('/api/items');
                    expect(res.body.payload).to.be.an('array');
                    expect(res.body.payload).to.have.length(10);
                    done();
                });
        });
    });

    describe('Reports', function() {
        it('should retireve all ordered items report on GET api/reports/items', function(done) {
            request(app)
                .get('/api/reports/items')
                .expect(200)
                .end(function(err, res) {
                    expect(res.body).to.not.be.undefined;
                    expect(res.body.links.self).to.be.equal('/api/reports/items');
                    expect(res.body.payload).to.be.an('array');
                    expect(res.body.payload[0]).to.have.property('_id');
                    expect(res.body.payload[0]).to.have.property('count');
                    done();
                });
        });
    });
});