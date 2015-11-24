/*jslint node: true */

var expect = require('chai').expect;
var sinon = require('sinon');
var orders = require('../../app/model/orders.js');

var db = require('../../app/db.js').get();
var mockdb = require('../mock-db.js');
var mockOrders = require('../mock-orders.js')();

describe('Orders', function() {

   before(function() {
      // mock database 
      var dbStub = sinon.stub(db, "collection", mockdb.collection);
   });

   describe('New order', function() {
      var order = mockOrders[0];
      it('should add new order', function(done) {
         orders.newOrder(order, function(result) {
            expect(result).to.not.be.undefined;
            expect(result).to.not.be.null;
            expect(result).to.be.an('object');
            expect(result.company).to.be.equal(order.company);
            expect(result.orderId).to.be.equal(order.orderId);
            expect(result.address).to.be.equal(order.address);
            done();
         });
      });
   });

   describe('Retrieve orders', function() {

      it('should retrieve all orders', function(done) {
         orders.findAll({}, function(result) {
            expect(result).to.not.be.undefined;
            expect(result).to.not.be.null;
            expect(result).to.be.an('array');
            expect(result).to.have.length.of.at.least(1);
            expect(result[0]).to.have.property('company');
            expect(result[0]).to.have.property('address');
            expect(result[0]).to.have.property('item');
            done();
         });
      });

      it('should retrieve all orders of a company : "SuperTrader" ', function(done) {
         orders.findAll({
            company: 'SuperTrader'
         }, function(result) {
            expect(result).to.not.be.undefined;
            expect(result).to.not.be.null;
            expect(result).to.be.an('array');
            expect(result).to.have.length(4);
            result.forEach(function(item) {
               expect(result[0].company).to.be.equal('SuperTrader');
            });
            done();
         });
      });

      it('should retrieve all orders to an address : "Steindamm 80" ', function(done) {
         orders.findAll({
            address: 'Steindamm 80'
         }, function(result) {
            expect(result).to.not.be.undefined;
            expect(result).to.not.be.null;
            expect(result).to.be.an('array');
            expect(result).to.have.length(2);
            result.forEach(function(item) {
               expect(result[0].address).to.be.equal('Steindamm 80');
            });
            done();
         });
      });

   });

   describe('Remove Order', function() {
      var order = mockOrders[0];

      it('should delete an exsiting order', function(done) {
         orders.deleteOne(order.orderId, function(result) {
            expect(result.success).to.be.true;
            done();
         });
      });

   });

   after('restore database mock', function(){
      db.collection.restore();
   });
});