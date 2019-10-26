const MyUser = require('mongoose').model('MyUser');
var userAuth = require('../../../auth/userAuth');

const resolv = {
    async user(dataInput, req) {
        try {
            await userAuth.adminRequired(req.payload);
            var user = await MyUser.find({ username: dataInput.username }).populate('likes');
            return user;
        } catch (error) {
            throw error;
        }
    },

    async users(dataInput, req) {
        try {
            await userAuth.adminRequired(req.payload);
            var user = await MyUser.find().populate('likes');
            return user;
        } catch (error) {
            throw error;
        }

    }

}

module.exports = resolv;