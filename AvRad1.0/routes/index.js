var express = require('express');
var router = express.Router();

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
  console.log(req.body);
  res.setHeader('Content-Type', 'application/json');

  var response = {
    isSuccess: true,
    value: {},
    message: ''
  };

  try {
    var repository = require('./../dal/repository/UserRepository');
    repository.insertUser(null, function (result) {
      response.value = result;
      res.end(JSON.stringify(response));
    });
  } catch (ex) {
    console.error(ex);
    res.end(JSON.stringify(ex));
  }
});

module.exports = router;
