/*jslint node: true */
"use strict";

module.exports = (function() {

    var url = require('url'),
        orders = require('../model/orders.js');

    var extractFilterFromUrl = function(requestUrl) {
        let filter = {};
        let query = url.parse(requestUrl, true).query;
        if (query) {
            for (let key in query) {
                filter[key] = query[key];
            }
        }
        return filter;
    }

    var processRequest = function(req, callback) {
        let path = url.parse(req.url).pathname;
        var parameters = path.split('/');
        // /api/orders/<parameter 1>/<parameter 2>

        switch (req.method) {
            case 'GET':
                var filter = extractFilterFromUrl(req.url);
                orders.findAll(filter, callback);
                break;
                
            case 'POST':
                orders.newOrder(req.body, callback);
                break;
                
            case 'DELETE':
                var orderId = parameters[1];
                if (orderId){
                    orders.deleteOne(orderId, callback);
                }else{
                    callback();
                }
                break;
                
            default:
                callback();
        }
    }

    var handler = function(req, res, next) {
        processRequest(req, function(result) {

            var output = {
                payload: result,
                links: {
                    self: req.originalUrl
                }
            }
            res.status(200).send(output);

        });
    }

    return {
        handler: handler
    }

})();