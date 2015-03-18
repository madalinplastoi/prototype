var mongoose = require('mongoose');
var WebConfig = require('./../WebConfig');

var connectionString = WebConfig.DATABASE_CONNECTION_STRING;
mongoose.connect(connectionString);

mongoose.connection.on('connected', function () {
    console.log("Connected to database")
});

mongoose.connection.on('error', function (err) {
    if (err)
        mongoose.connection.close();
    mongoose.connect(connectionString);
    console.log("Mongoose default connection error: " + err)
});

mongoose.connection.on('disconnected', function () {
    console.log("Mongoose default connection disconnected");
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
