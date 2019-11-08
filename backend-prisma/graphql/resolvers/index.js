const Query = require('./Query');
const Mutation = require('./Mutation')
const Subscription = require('./Subscriptions');

const resolvers = {
    Query,
    Subscription,
    Mutation
}

module.exports = {
    resolvers
}
