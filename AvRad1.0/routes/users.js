var express = require('express');
var router = express.Router();
var User = require('./../dal/entity/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  return User.UserModel.find(function (err, users) {
    if (!err) {
      return res.send(users);
    } else {
      return console.log(err);
    }
  });
});

router.get('/setup', function(req, res, next) {
  var dbSetup = require('./../dal/DbSetup')
  var BaseResponse = require('./../web/BaseResponse');

  var response = new BaseResponse();

  var promise = dbSetup.clearPromise();
  promise
      .then(function (result) {
        response.setIsSuccess(true);
        response.setValue(result)
        res.send(response);
      }, function (err) {
        response.setIsSuccess(false);
        response.setMessage(err.message);
        res.send(response);
      });
});

module.exports = router;
