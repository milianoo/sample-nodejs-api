/*jslint node: true */
"use strict";

var expect = require('chai').expect;
var sinon = require('sinon');
var items = require('../../app/model/items.js');

var db = require('../../app/db.js').get();
var mockdb = require('../mock-db.js');
var mockItems = require('../mock-items.js')();


describe('Items', function() {

   before(function() {
      // mock database 
      var dbStub = sinon.stub(db, "collection", mockdb.collection);
   });

   describe('Add new item', function() {

      it('should add new item');

   });

   describe('Retrieve items', function() {

      it('should retrieve all items', function(done) {
         items.findAll({}, function(result) {
            expect(result).to.not.be.undefined;
            expect(result).to.not.be.null;
            expect(result).to.be.an('array');
            expect(result).to.have.length.of.at.least(1);
            expect(result[0]).to.have.property('name');
            done();
         });
      });

      it('should retrieve a single item');

   });

   describe('Remove items', function() {

      it('should remove an item');

   });

   after('restore database mock', function() {
      db.collection.restore();
   });

});