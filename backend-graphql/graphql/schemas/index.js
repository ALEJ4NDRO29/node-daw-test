const graphql = require('graphql');
const mergeTypes = require('merge-graphql-schemas').mergeTypes;

const element = require('./elements/element.schema');
const users   = require('./users/user.schema')

const schemas = [
    element,
    users
];

const merged = mergeTypes(schemas);

module.exports = graphql.buildSchema(merged);