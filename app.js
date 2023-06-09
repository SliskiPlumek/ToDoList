const { ApolloServer } = require('@apollo/server')
const dotenv = require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const {expressMiddleware} = require('@apollo/server/express4')

const app = express()

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

// app.use(bodyParser.json())

// setting up an apollo server for using graphql
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    formatError: (error) => {
        if(!error.originalError) {
            return error
        }

        const data = error.data
        const code = error.originalError.code || 500
        const message = error.message || 'An error occured'

        return {message: message, data: data, code: code}
    }, 
    context: ({req, res}) => {return {req, res}}
})

const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.xmbmroe.mongodb.net/${process.env.MONGODB_DEAFULT_BASE}`

async function startServer() {
    await server.start()
    
    app.use('/graphql', cors(), bodyParser(), expressMiddleware(server, {
        context: ({req, res}) => {return {req: req}}
    }))

    await mongoose.connect(MONGODB_URI)

    app.listen(process.env.PORT || 8080, () => {
        console.log('server is running')
    })

    console.log('db connected')
}

startServer()