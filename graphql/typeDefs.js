const {gql} = require('apollo-server')

const typeDefs = gql`
    type Query {
        todos: [Todo!]!
    }

    type Todo {
        content: String!
        createdAt: String!
        updatedAt: String!
        _id: ID
    }

    input TodoDataInput {
        content: String!
    }

    type Mutation {
        createTodo(todoData: TodoDataInput): Todo!
        updateTodo(id: ID!, todoData: TodoDataInput): Todo!
        deleteTodo(id: ID!): Boolean!
    }
`

module.exports = typeDefs