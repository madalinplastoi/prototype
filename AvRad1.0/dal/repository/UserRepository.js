var UserModel = require('./../entity/UserModel');
var mongoose = require('mongoose');

exports.insertUser = function(user, callback) {
    var user1 = new UserModel.User();

    user1._id = new mongoose.Types.ObjectId();
    user1.name = 'bibi';
    user1.email = 'bibi@aol.com';
    user1.username = 'bibi_mic';
    user1.password = 'mi-e somn';
    user1.rememberMe = true;

    user1.save(function (err, user1) {
        if (err)
            return console.error(err);
        callback(user1);
    });
}