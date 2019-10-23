const MyUser = require('mongoose').model('MyUser');

const resolv = {
    async user(usename) {
        var user = await MyUser.find(usename);
        return user;
    }
}

module.exports = resolv;