var mongoose = require('mongoose');

var MyUserSchema = new mongoose.Schema({
    socialid: { type: String, unique: true },
    username: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^([a-zA-Z0-9])\w+/, 'is invalid'], index: true },
    img: String,
    email: { type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/, 'is invalid'], index: true },
    bio: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Element' }],
    hash: String,
    salt: String,
    admin: Boolean
}, {
    timestamps: true,
    usePushEach: true
});

MyUserSchema.methods.isAdmin = function () {
    return this.admin != null ? this.admin : false;
}

mongoose.model('MyUser', MyUserSchema);