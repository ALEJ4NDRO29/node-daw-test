const MyUser = require('mongoose').model('MyUser');

const resolv = {
    async user(username) {
        var user = await MyUser.find(username).populate('likes');
        return user;
    },

    async users() {
        var user = await MyUser.find().populate('likes');
        return user;
    }

}

module.exports = resolv;