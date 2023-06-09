const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Todo = new Schema({
    content: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Todo', Todo)