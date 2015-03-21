var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main/index', { title: 'Main site' });
});

/* GET admin page. */
router.get('/admin', function(req, res, next) {
  res.render('admin/index', { title: 'Admin' });
});

router.get('/login', function(req, res, next) {
  res.render('admin/login', { title: 'Sign in -> Giani Raduinea' });
});

router.post('/login', function(req, res) {
  var BaseResponse = require('./../web/BaseResponse');
  var response = new BaseResponse();

  try {
    var repository = require('./../dal/repository/UserRepository');
    var promise = repository.getByLoginPromise(req.body.username, req.body.password);
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
  }
  catch (ex) {
    response.setIsSuccess(false);
    response.setMessage(ex)
    res.send(response);
  }
});

router.get('/register', function(req, res) {
  var BaseResponse = require('./../web/BaseResponse');
  var User = require('./../dal/entity/User');

  var user1 = new User.UserModel();

  user1._id = new mongoose.Types.ObjectId();
  user1.name = 'bibi';
  user1.email = 'aaa@bbb.ccc';
  user1.username = 'jumbojum';
  user1.password = 'password';
  user1.rememberMe = true;

  var response = new BaseResponse();

  try {
    var repository = require('./../dal/repository/UserRepository');

    var promise = repository.insertUserPromise(user1);
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
  }
  catch (ex) {
    response.setIsSuccess(false);
    response.setMessage(ex)
    res.send(response);
  }
});

module.exports = router;
