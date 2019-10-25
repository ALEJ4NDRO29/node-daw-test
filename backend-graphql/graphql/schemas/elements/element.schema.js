var schema = `
    type Element {
        slug: String,
        type: String,
        title: String,
        description: String,
        rate: Int,
        tags: [String]
    }

    type Query {
        element(slug: String!): [Element]
        elements : [Element]
    }

`;

module.exports = schema;