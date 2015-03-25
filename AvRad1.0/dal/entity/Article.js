this.Id = '';
this.Title = '';
this.Text = '';
this.Url = '';
this.Active = false;
this.CreatedOn = null;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

var _article = new Schema({
    _id:    {type:ObjectIdSchema, default: new ObjectId()},
    title: String,
    email: String,
    username: String,
    password: String,
    rememberMe: Boolean,
    lastAccessOn: {type: Date, default: Date.now}
},{ collection: 'users' });

var UserModel = mongoose.model('User', _user);

exports.UserModel = UserModel;

