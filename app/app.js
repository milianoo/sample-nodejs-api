/*jslint node: true */
"use strict";

(function() {
    var db = require('./db.js');
    var bodyParser = require('body-parser'),
        url = require('url'),
        orderController = require('./controller/orderController.js'),
        itemController = require('./controller/itemController.js'),
        reportController = require('./controller/reportController.js'),
        express = require('express'),
        app = express();
    
    app.use(bodyParser.json());

    app.use(function(req, res, next) {
        //console.log(req.method + ' ' + req.url);
        res.setHeader('Content-Type', 'application/json');
        next();
    });
    
    app.get('/help', function(req,res){
        res.sendFile(__dirname + '/apidoc/index.html');
    });
    
    app.use('/api/orders', orderController.handler);
    app.use('/api/items', itemController.handler);
    app.use('/api/reports', reportController.handler);

    module.exports = app;
})();