// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// var passportLocalMongoose = require('passport-local-mongoose');

// var UserSchema = new Schema({
//     username: String,
//     password: String
// });

// UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("users", UserSchema)

module.exports = User;