/*jslint node: true */
"use strict";

module.exports = (function() {

    var db = require('../db.js');

    /**
     * @api {get} /items retrieve items
     * @apiVersion 0.0.1
     * @apiName FindAll
     * @apiGroup Items
     *
     * @apiExample Example usage:
     * GET http://<host name>/items 
     * 
     * @apiSuccess {array} payload list of items
     * @apiSuccess {object} links list links related to the request
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "payload": [{
     *       name: "Macbook Pro"
     *     },
     *     {
     *       name: "Book 'Guide to Hamburg'"
     *     }],
     *       "links": {self: /api/items}
     *     }
     * 
     */
    var findAll = function(query, callback) {
        var items = db.get().collection('items');

        items.find(query).toArray(function(err, docs) {
            if (err)
                console.log(err);
            callback(docs);
        });
    };

    return {
        findAll: findAll
    };

})();