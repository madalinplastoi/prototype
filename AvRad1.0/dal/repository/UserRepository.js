var User = require('./../entity/User');
var Q = require('q');

exports.insertUserPromise = function (user) {
    return Q.fcall(function () {
        var deferred = Q.defer();

        if (user == null || user === undefined) deferred.reject(new Error('User cannot be null.'));
        else user.save(function (err, result) {
            if (err) deferred.reject(new Error(err));
            else deferred.resolve(result);
        });

        return deferred.promise;
    });
}

exports.getByLoginPromise = function(username, password) {
    return Q.fcall(function () {
        var deferred = Q.defer();

        if (username == null || username === undefined) deferred.reject(new Error('Username cannot be null.'));
        else if (password == null || password === undefined) deferred.reject(new Error('Password cannot be null.'));
        else User.UserModel.findOne({'username': username, 'password': password},function (err, result) {
            if (err) deferred.reject(new Error(err));
            else deferred.resolve(result);
        });

        return deferred.promise;
    });
}
