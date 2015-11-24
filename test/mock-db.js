var mockOrders = require('./mock-orders.js')();
var mockItems = require('./mock-items.js')();

module.exports = (function() {

    var collection = function(collectionName) {

        switch (collectionName) {
            case 'orders':
                var insertOne = function(item, callback) {
                    var output = {
                        insertedCount: 1,
                        ops: [item]
                    }
                    callback(null, output);
                };

                var find = function(query) {
                    var result = [];
                    if (query.company || query.address) {
                        mockOrders.forEach(function(order) {
                            if (query.company === order.company || query.address === order.address) {
                                result.push(order);
                            }
                        });
                    }
                    else {
                        result = mockOrders;
                    }

                    return {
                        toArray: function(callback) {
                            callback(null, result);
                        }
                    };
                };
                
                var aggregate = function(callback) {
                    var result = [{_id: "Inline Skates", count: "2"}, {_id: "Macbook", count: "2"}, {_id: "Book 'Guide to Hamburg'", count: "1"}];
                    return {
                        toArray: function(callback) {
                            callback(null, result);
                        }
                    };
                };

                var deleteOne = function(query, callback) {
                    var deletedCount = 0;
                    mockOrders.forEach(function(order) {
                        if (order.orderId === query.orderId) {
                            deletedCount += 1;
                        }
                    });
                    callback(null, {
                        deletedCount: deletedCount
                    });
                };

                return {
                    insertOne: insertOne,
                    find: find,
                    aggregate: aggregate,
                    deleteOne: deleteOne
                }
                
            case 'items':
                var find = function(query) {
                    var result = [];
                    if (query.name) {
                        mockItems.forEach(function(item) {
                            if (query.name === item.name) {
                                result.push(item);
                            }
                        });
                    }
                    else {
                        result = mockItems;
                    }

                    return {
                        toArray: function(callback) {
                            callback(null, result);
                        }
                    };
                };
                
                return{
                    find: find
                }
            default:
                return;
        }


    }

    return {
        collection: collection
    }

})();