const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        image: String
        items: [Item]
    }
    type Item {
        _id: ID
        itemName: String
        itemPrice: Float
        itemLocation: String
        itemImage: String
        username: String
        createdAt: String
    }

    type Auth {
        token: ID!
        user: User
    }
    type Query {
        me: User
        users: [User]
        items(username: String!): [Item] 
        item(id: ID!): Item 
        
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!, image: String!): Auth
        addItem(itemName: String!, itemPrice: Float!, itemLocation: String!, itemImage: String!): Auth
    }
`;

module.exports = typeDefs;