var server = require('./app/app.js');
var db = require('./app/db.js');

server.listen(process.env.PORT || 5000, function() {
    console.log("server started...");
    db.connect(function() {
        console.log("database connected...");
    });

});