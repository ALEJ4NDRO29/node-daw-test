var MyUser = require('mongoose').model('MyUser');
var logger = require('log4js').getLogger();

var adminRequired = async function adminRequired(payload) {
    try {
        if (payload == null) { 
            throw 'Unauthorized';
        }
        var user = await MyUser.findById(payload.id);
        
        if(!user.isAdmin()) {
            logger.warn('Unauthorized user for get users')
            logger.warn(payload)
            throw 'Unauthorized';
        } 
    } catch (error) {
        throw error;
    }

}

var userAuth = {
    adminRequired: adminRequired
}

module.exports = userAuth;