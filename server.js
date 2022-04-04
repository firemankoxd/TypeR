import dotenv from 'dotenv'
import { checkCommand } from './commands.js'
import express from 'express'
import { Server } from "socket.io";

dotenv.config()
const port = process.env.PORT
const io = new Server(port, {
    cors: {
        origin: "*"
    },
});

/*
const app = require('express')
const io = require('socket.io')(3000,{
    cors: {
        origin: "*"
    },
})
*/

const users = {}

console.log(`Server starts on port ${port}`);

io.on('connection', socket => {
    socket.on('new-user', name => {
        users[socket.id] = name
        io.emit('user-joined', name)
    })
    socket.on('send-chat-message' , message => {
        let user = users[socket.id]
        io.emit('chat-message', { 
            message: message, 
            name: users[socket.id]})
        if(message.startsWith("-"))
            io.emit('send-server-message', checkCommand(user, message))
    })
})

// npm start nodemon server.js
// https://socket.io/docs/v3/broadcasting-events/
// https://github.com/socketio/socket.io/issues/2168

// https://stackoverflow.com/questions/58699790/i-have-node-js-application-i-am-setting-env-using-dotenv-i-get-the-following-e
