var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('../config/secret').appSecret;

var MyUserSchema = new mongoose.Schema({
    socialid: {type:String,unique:true},
    username: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^([a-zA-Z0-9])\w+/, 'is invalid'], index: true },
    email: { type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/, 'is invalid'], index: true },
    bio: String,
    hash: String,
    salt: String
}, { timestamps: true });

MyUserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

MyUserSchema.methods.generateJWT = function () {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, secret);
}

MyUserSchema.methods.toProfileJSON = function () {
    return {
        username: this.username,
        email: this.email,
        bio: this.bio
    }
}

MyUserSchema.methods.getNoUpgradeableFields = function () {
    return {
        username: this.username,
        email: this.email
    }
}

MyUserSchema.methods.getUpgradeableFields = function () {
    console.log(this.bio);
    
    return {
        bio: this.bio ? this.bio : null
    }
}


MyUserSchema.methods.toAuthJSON = function (user) {
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT()
    }
}

MyUserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

MyUserSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
}

mongoose.model('MyUser', MyUserSchema);