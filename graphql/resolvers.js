const Todo = require('../models/todo')

const resolvers = {
    Query: {
        todos: async (_, __, {req, res}) => {
            const todos = await Todo.find()
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
        createTodo: async (_, {todoData}, {req, res}) => {
            const todo = new Todo({
                content: todoData.content
            })

            const newTodo = await todo.save()

            return {...newTodo._doc, _id: newTodo._id.toString(), createdAt: newTodo.createdAt.toISOString(), updatedAt: newTodo.updatedAt.toISOString()}
        },

        updateTodo: async (_, {id, todoData}, {req, res}) => {
            const todo = await Todo.findById(id)

            if(!todo) {
                const error = new Error()
                error.message = 'Cannot find todo!'
                error.code = 500
                
                throw error
            }

            todo.content = todoData.content

            const updatedTodo = await todo.save()
            return {...updatedTodo._doc, _id: updatedTodo._id.toString(), createdAt: updatedTodo.createdAt.toISOString(), updatedAt: updatedTodo.updatedAt.toISOString()}
        },

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