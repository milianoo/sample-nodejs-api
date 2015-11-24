/*jslint node: true */

module.exports = (function() {

    var config = require("./config.js");

    var mongo = require('mongodb');
    var mongoClient = mongo.MongoClient;
    var Server = mongo.Server;
    var Db = mongo.Db;

    var server = new Server(config.MONGO_SERVER_NAME, config.MONGO_SERVER_PORT, {
        auto_reconnect: true
    });

    var db = new Db('borderguru', server);

    var connected = false;
    var connect = function(callback) {
        if (!connected) {
            db.open(function(err, client) {
                if (err)
                    return err;
                client.authenticate(config.MONGO_USER_ADMIN, config.MONGO_ADMIN_PASSWORD, function(err, success) {
                    if (err)
                        return err;
                    connected = true;
                    callback();
                });
            });
        }
        else {
            callback();
        }
    };

    var get = function() {
        return db;
    };

    return {
        connect: connect,
        get: get
    };

})();
