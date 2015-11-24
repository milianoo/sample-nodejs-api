/*jslint node: true */

module.exports = (function() {

    var db = require('../db.js');

    /**
     * @api {post} /orders Create a new order
     * @apiVersion 0.0.1
     * @apiName NewOrder
     * @apiGroup Orders
     *
     * @apiExample Example usage:
     * POST http://<host name>/orders 
     *
     * @apiParamExample {json} Request body example:
     *     {
     *       orderId: '0011',
     *       company: 'Cheapskates',
     *       address: 'Lagerstrasse 11',
     *       item: 'Flux compensator'
     *     } 
     * 
     * @apiSuccess {Object}  payload  newly created account
     * @apiSuccess {object} links list links related to the request 
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "payload": 
     *          {
     *              orderId: "0011",
     *              company: "Cheapskates",
     *              address: "Lagerstrasse 11",
     *              item: "Flux compensator"
     *          },
     *       "links": {self: /api/orders}
     *     }
     *  
     */
    var newOrder = function(order, callback) {
        var orders = db.get().collection('orders');

        orders.insertOne(order, function(err, result) {
            if (err)
                console.log(err);
            if (result.insertedCount === 1) {
                callback(result.ops[0]);
            }else{
                callback();
            }
            
        });
    };

    /**
     * @api {get} /orders Retrieve orders
     * @apiVersion 0.0.1
     * @apiName FindAll
     * @apiGroup Orders
     *
     * @apiExample Example usage:
     * GET http://<host name>/orders 
     * 
     * @apiSuccess {array} payload list of orders
     * @apiSuccess {object} links list links related to the request
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "payload": 
     *          [{
     *              orderId: "007",
     *              company: "Cheapskates",
     *              address: "Lagerstrasse 11",
     *              item: "Flux compensator"
     *          }],
     *       "links": {self: /api/orders}
     *     }
     * 
     */
    var findAll = function(query, callback) {
        var orders = db.get().collection('orders');

        orders.find(query).toArray(function(err, docs) {
            if (err)
                console.log(err);
            callback(docs);
        });
    };
    
    /**
     * @api {get} /reports/items Retrieve frequent ordered items
     * @apiVersion 0.0.1
     * @apiName itemsOrderedCount
     * @apiGroup Reports
     *
     * @apiExample Example usage:
     * GET http://<host name>/reports/items 
     * 
     * @apiSuccess {array} payload list of items with order count
     * @apiSuccess {object} links list links related to the request
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "payload": [{ 
     *          _id: 'Inline Skates', count: 2 },{ 
     *          _id: 'Macbook', count: 2 
     *       }],
     *       "links": {self: /api/reports/items}
     *     }
     * 
     */
    var itemsOrderedCount = function(callback) {
        var orders = db.get().collection('orders');

        orders.aggregate(
            [{
                $group: {
                    "_id": "$item",
                    "count": {
                        $sum: 1
                    }
                }
            }, {
                "$sort": {
                    "count": -1
                }
            }, ]).toArray(function(err, result) {
            if (err)
                console.log(err);
            callback(result);
        });
    };

    /**
     * @api {DELETE} /orders/:id Delete an order
     * @apiVersion 0.0.1
     * @apiName DeleteOrder
     * @apiGroup Orders
     *
     * @apiParam {String} id The order id.
     * 
     * @apiExample Example usage:
     * DELETE http://<host name>/orders/4711
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "payload": { 
     *          success: true
     *       },
     *       "links": {self: /api/orders/4711}
     *     }
     *  
     */
    var deleteOne = function(orderId, callback) {
        var orders = db.get().collection('orders');

        orders.deleteOne({
            orderId: orderId
        }, function(err, result) {
            if (err)
                console.log(err);
            if (result.deletedCount === 1) {
                callback({success: true});
            }
            else {
                callback({success: false});
            }
        });
    };

    return {
        newOrder: newOrder,
        findAll: findAll,
        itemsOrderedCount: itemsOrderedCount,
        deleteOne: deleteOne
    };

})();