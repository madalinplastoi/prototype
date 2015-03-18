var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

var _user = new Schema({
    _id:    {type:ObjectIdSchema, default: new ObjectId()},
    name: String,
    email: String,
    username: String,
    password: String,
    rememberMe: Boolean,
    lastAccessOn: {type: Date, default: Date.now}
},{ collection: 'users' });

var User = mongoose.model('User', _user);

exports.User = User;
