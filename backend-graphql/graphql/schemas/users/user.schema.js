var schema = `
    type User {
        username: String,
        admin: Boolean,
        likes: [Element]
    }

    type Query {
        user(username: String!) : [User],
        users: [User]
    }
`

module.exports = schema;