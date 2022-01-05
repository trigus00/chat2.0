const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io')
// format message 
const formatMessage = require('./utils/messages')
// user property 
const {userJoin,getCurrentUser,userLeft,getRoom} = require('./utils/users')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const name = 'chatbot'

// set static folder 
app.use(express.static(path.join(__dirname, 'public')))

// Run in client connect 
io.on('connection', socket =>{

    socket.on('join',({username,room})=>{
        const user = userJoin(socket.id,username,room);
        socket.join(user.room)
         // console.log('New websocket connection ')
        socket.emit('message',formatMessage(name,'Welcome to the Chat ! '))


    // broadcast new user
    socket.broadcast.to(user.room).emit('message',formatMessage(name,`${user.username} has join the chat`));
    // send user and info 
        
    io.to(user.room).emit('roomUsers',{
            room: user.room,
            users: getRoom(user.room)
            })


    });
   

   
    // listen for message 
    socket.on('chat-message',(message)=>{
        const user = getCurrentUser(socket.id); 
        io.to(user.room).emit('message',formatMessage(user.username, message, user.color));
    })
    // disconnects 
    socket.on('disconnect',()=>{
        const user = userLeft(socket.id);

        if(user){
            io.to(user.room).emit('message',formatMessage(name,` ${user.username} has left chat`));
       
        io.to(user.room).emit('roomUsers',{
            room: user.room,
            users: getRoom(user.room)
            })
        };

    })

})
const PORT = 4000 || process .env.PORT; 

server.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}`)
})