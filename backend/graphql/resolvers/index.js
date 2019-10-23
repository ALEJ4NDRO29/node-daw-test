const elements = require('./elements/element.resolv');
const user = require('./users/users.resolv');

const resolvers = {
    ...elements,
    ...user
};

module.exports = resolvers;