require('dotenv').config();

const PORT = process.env.PORT;

const mongoose = require('mongoose');
//const { Socket } = require('socket.io');

const io = require('socket.io')(PORT, {
    cors: {
        origin: ["http://127.0.0.1:5500"]
    }
});

var i = 0;
var anonymousCount = 1;
const users = {};
//connect to socket io server
io.on('connection', socket => {
    console.log("new user");
  
    socket.on('new-user', name => {
        users[socket.id] = name;
        //check and make name anonymous
        if(!name){
            name = "Anonymous " + anonymousCount;
            anonymousCount++;
            users[socket.id] = name;
        }
        
        socket.broadcast.emit('user-connected', name);
    })

    const map = new Map();
    socket.on('join-room', (roomID) => {
        if(roomID === ""){
            //roomID = socket.id.toString();
            roomID = i.toString();
            i++;
        }

        //roomID = "85u6rCPRmWOGErorAAAF";
        socket.join(roomID); 
        console.log(roomID);

        socket.on('send-chat-message', message => {
            console.log(message, roomID);
            map.set(roomID, message);
            console.log(socket.rooms);
            socket.to(roomID).emit('chat-message', {message: message, name: users[socket.id]})
            console.log(map);
        }); 


    // //send message to user
    // socket.on('send-chat-message', message => {
    //     socket.emit('chat-message', {message: message, name: users[socket.id]})
    //     console.log(message);   
    })
      

    //send disconnect message to user
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id];
    })
})
