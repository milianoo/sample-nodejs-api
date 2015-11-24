/*jslint node: true */
"use strict";

module.exports = (function() {

    var url = require('url'),
        orders = require('../model/orders.js');
        
        
    var processRequest = function(req, callback) {
        var path = url.parse(req.url).pathname;
        
        switch (path) {
            case '/items':
                orders.itemsOrderedCount(callback);
                break;
            
            default:
                callback();
        }
    };

    var handler = function(req, res, next) {
        processRequest(req, function(result) {

            var output = {
                payload: result,
                links: {
                    self: req.originalUrl
                }
            };
            res.status(200).send(output);

        });
    };

    return {
        handler: handler
    };

})();