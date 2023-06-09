const {gql} = require('apollo-server')

const typeDefs = gql`
    type Query {
        # query for getting all todos in array
        todos: [Todo!]!
    }

    type Todo {
        # Todo schema
        content: String!
        createdAt: String!
        updatedAt: String!
        _id: ID
    }

    input TodoDataInput {
        # input data
        content: String!
    }

    type Mutation {
        # mutation for creating new todo
        createTodo(todoData: TodoDataInput): Todo!
        # mutation for updating existing todo
        updateTodo(id: ID!, todoData: TodoDataInput): Todo!
        # mutation for deleting todo which is returning boolean based on success of operation
        deleteTodo(id: ID!): Boolean!
    }
`

module.exports = typeDefs