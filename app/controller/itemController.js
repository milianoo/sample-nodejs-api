/*jslint node: true */
"use strict";

module.exports = (function() {

    var url = require('url'),
        items = require('../model/items.js');

    var extractFilterFromUrl = function(requestUrl) {
        var filter = {};
        var query = url.parse(requestUrl, true).query;
        if (query) {
            for (var key in query) {
                filter[key] = query[key];
            }
        }
        return filter;
    };

    var processRequest = function(req, callback) {
        var path = url.parse(req.url).pathname;
        var parameters = path.split('/');
        // /api/orders/<parameter 1>/<parameter 2>

        switch (req.method) {
            case 'GET':
                var filter = extractFilterFromUrl(req.url);
                items.findAll(filter, callback);
                break;
            default:
                callback();
        }
    };

    var handler = function(req, res, next) {
        processRequest(req, function(result) {
            // if result is undefind throw 400 error 
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