var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('../config/secret').appSecret;
var logger = require('log4js').getLogger();

var MyUserSchema = new mongoose.Schema({
    socialid: { type: String, unique: true },
    username: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^([a-zA-Z0-9])\w+/, 'is invalid'], index: true },
    img: String,
    email: { type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/, 'is invalid'], index: true },
    bio: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Element' }],
    hash: String,
    salt: String
}, {
    timestamps: true,
    usePushEach: true
});

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
        img: this.img || 'https://static.productionready.io/images/smiley-cyrus.jpg',
        bio: this.bio
    }
}

MyUserSchema.methods.toPublicProfileJSON = function () {
    return this.toProfileJSON();
}

MyUserSchema.methods.getNoUpgradeableFields = function () {
    return {
        username: this.username,
        email: this.email
    }
}

MyUserSchema.methods.getUpgradeableFields = function () {
    return {
        bio: this.bio ? this.bio : null
    }
}


MyUserSchema.methods.toAuthJSON = function (user) {
    return {
        username: this.username,
        email: this.email,
        img: this.img || 'https://static.productionready.io/images/smiley-cyrus.jpg',
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

/**
 * @param Element mongo model
 */
MyUserSchema.methods.like = function (element) {

    var id = element._id;

    if (this.likes.indexOf(id) === -1) {
        this.likes.push(id);
        var _this = this;
        element.like().then(function () {
            return _this.save();
        }).catch(function (err) {
            throw err;
        });
    }
    return this.save();
}

/**
 * @param Element mongo model
 */
MyUserSchema.methods.unlike = function (element) {
    var id = element._id;

    if (this.likes.indexOf(id) !== -1) {
        this.likes.remove(id);
        var _this = this;
        element.unlike().then(function () {
            return _this.save();
        }).catch(function (err) {
            throw err;
        });
    }
    return this.save();
}

mongoose.model('MyUser', MyUserSchema);