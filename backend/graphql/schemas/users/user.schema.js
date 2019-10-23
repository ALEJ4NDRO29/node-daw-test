var schema = `
    type User {
        username: String,
        likes: [Element]
    }

    type Query {
        user(username: String!) : [User]
    }
`

module.exports = schema;