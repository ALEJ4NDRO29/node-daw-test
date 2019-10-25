var schema = `
    type User {
        username: String,
        likes: [Element]
    }

    type Query {
        user(username: String!) : [User],
        users : [User]
    }
`

module.exports = schema;