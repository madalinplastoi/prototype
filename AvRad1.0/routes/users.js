var express = require('express');
var router = express.Router();
var UserModel = require('./../dal/entity/UserModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  return UserModel.User.find(function (err, users) {
    if (!err) {
      return res.send(users);
    } else {
      return console.log(err);
    }
  });
});

module.exports = router;
