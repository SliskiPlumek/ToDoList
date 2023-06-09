const Todo = require('../models/todo')

const resolvers = {
    Query: {
        // resolver for getting all todos in array
        todos: async (_, __, {req, res}) => {
            const todos = await Todo.find()
            // returning all found todos and map it to return it`s doc, id etc.
            return todos.map(t => {
                return {
                    ...t._doc,
                    _id: t._id.toString(), 
                    createdAt: t.createdAt.toISOString(), 
                    updatedAt: t.updatedAt.toISOString()
                }
            })
        }
    },

    Mutation: {
        // resolver for creating new todo
        createTodo: async (_, {todoData}, {req, res}) => {
            // creating a todo
            const todo = new Todo({
                content: todoData.content
            })
            // store it in db
            const newTodo = await todo.save() 

            return {...newTodo._doc, _id: newTodo._id.toString(), createdAt: newTodo.createdAt.toISOString(), updatedAt: newTodo.updatedAt.toISOString()}
        },
        // resolver for updating a existing todo
        updateTodo: async (_, {id, todoData}, {req, res}) => {
            // checking if todo with certain id exists
            const todo = await Todo.findById(id)

            if(!todo) {
                const error = new Error()
                error.message = 'Cannot find todo!'
                error.code = 500
                
                throw error
            }

            todo.content = todoData.content
            // updating, saving and returning updated todo
            const updatedTodo = await todo.save()
            return {...updatedTodo._doc, _id: updatedTodo._id.toString(), createdAt: updatedTodo.createdAt.toISOString(), updatedAt: updatedTodo.updatedAt.toISOString()}
        },
        // resolver for deleting a todo based on todo`s id
        deleteTodo: async (_, {id}, {req, res}) => {
            const todo = await Todo.findById(id)

            if(!todo) {
                const error = new Error()
                error.message = 'Cannot find todo!'
                error.code = 500

                throw error
            }

            await Todo.findByIdAndRemove(id)

            return true
        }
    }
}


module.exports = resolvers