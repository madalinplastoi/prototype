var User = require('./entity/User');
var WebConfig = require('./../web/WebConfig');
var Q = require('q');

exports.clearPromise = function() {
    return Q.fcall(function () {
        var deferred = Q.defer();
        User.UserModel.find(function (err, result) {
            if (err) deferred.reject(new Error(err));
            else deferred.resolve(result);
        });
        return deferred.promise;
    }).then(function (result) {
        var deferred = Q.defer();
        var index = 0;
        var length = result.length;
        if (length > 0) {
            for (var i in result) {
                result[i].remove(function (err, result) {
                    if (err) deferred.reject(new Error(err));
                    else {
                        index++;
                        if (index == length) {
                            var message = index == 1 ? 'Success: 1 user was removed.' : 'Success: ' + index + ' users were removed.'
                            deferred.resolve(message);
                        }
                    }
                });
            }
        }
        else deferred.resolve('No user to delete.');
        return deferred.promise;
    });
}