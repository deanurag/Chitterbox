const {Server} = require('socket.io');
const http = require('http');   
const express = require('express');

const app = express();  

const server = http.createServer(app);  // Creating a server using express app
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000'],
        methods: ['GET','POST']
    }
});  // Creating a socket server using the created server
const getReceiverSocketId = (receiverId) => {
    return usersSocketMap[receiverId];
}

const usersSocketMap = {};
io.on('connection',(socket)=>{
    console.log("A user connected",socket.id);

    const userId = socket.handshake.query.userId;

    if(userId != 'undefined')
        usersSocketMap[userId] = socket.id;

    io.emit('getOnlineUsers',Object.keys(usersSocketMap));
    // Listening to the event 'message' from the client
    socket.on('disconnect',()=>{
        console.log("A user disconnected",socket.id);
        delete usersSocketMap[userId];
        io.emit('getOnlineUsers',Object.keys(usersSocketMap));
    })
})

module.exports = {app,io,server, getReceiverSocketId};