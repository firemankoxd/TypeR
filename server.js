const app = require('express')
const io = require('socket.io')(3000,{
    cors: {
        origin: "*"
    },
})

const users = {}

console.log('Server starts on port 3000');

io.on('connection', socket => {
    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-joined', name)
    })
    socket.on('send-chat-message' , message => {
        socket.broadcast.emit('chat-message', { 
            message: message, 
            name: users[socket.id]})
    })
})
