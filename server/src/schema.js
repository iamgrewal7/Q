const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
    }
    
    type QItem {
        id: ID!
        user: User!
        appendDate: String!
        popDate: String
        topDate: String
        category: Category
    }

    type Category {
        id: ID!
        name: String!
    }

    type Query {
        users: [User]
        categories: [Category]
        queue: [QItem]
    }

    type Mutation {
        addCategory(name: String!): Category
        addItem(name: String!, categoryId: ID! ): QItem
        popItem(id: ID!, categoryId: ID!): QItem
    }
`;

module.exports = typeDefs;