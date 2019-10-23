const router = require('express').Router();
const graphqlHTTP = require('express-graphql');

const schemas = require('../../graphql/schemas');
const resolvers = require('../../graphql/resolvers');

router.use(
    '/', // graphql
    graphqlHTTP({
        schema: schemas,
        rootValue: resolvers,
        graphiql: true
    }),
);

module.exports = router;