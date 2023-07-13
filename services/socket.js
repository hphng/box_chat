
const uuid = require('uuid');
const {Server} = require('socket.io');
const redisClient = require('./redis');
const User = require('../models/user.model');
const Admin = require('../models/admin.model');
const {dbConnect} = require('./mongoDb');

const createSocket = (server) => {
    const io = new Server(server)
    return io;
}

const userSocket = async(io) => {
    // await redisClient.connect();
    await dbConnect();

    const userNameSpace = io.of('/user');
    //connect to socket io server 
    userNameSpace.on('connection', async (socket) => {
        console.log("a user connected! ", socket.id);

        socket.on('userClient', async ({userID, admin}) => {
            socket.join(userID);

            const user = await User.findById(userID).exec();
            let name = admin;
            if(!admin){
                name = user.name;
            }
            await user.save();

            const arrHistoryMessage = user.history;

            await socket.emit('chat-history', arrHistoryMessage);


            await socket.to(userID).emit('user-connected', name);
            console.log(name);

            await socket.to(userID).emit('user-disconnected', name);
            
            let lines = [];
            socket.on('send-chat-message', async (message) => {
                const line = name + ": " + message.message;
                lines.push(line);
                console.log(line);
                console.log("[h]: ", lines);

                const userSave = await User.findById(userID);
                await userSave.history.push(line);
                await userSave.save();

                socket.to(userID).emit('chat-message', {message: message.message, name: name });
            }); 

        })


        // //send message to user
        // socket.on('send-chat-message', message => {
        //     socket.emit('chat-message', {message: message, name: users[socket.id]})
        //     console.log(message);   
      
    })
}

const adminChatSocket = async(io) => { 

    const adminChatNameSpace = io.of('/adminChat');
    //connect to socket io server 
    adminChatNameSpace.on('connection', async (socket) => {
        console.log('an admin connected!');

        await dbConnect();
        // socket.on('new-admin', async ({adminID, roomID}) => {
        //     console.log(adminID);
        //     const admin = await Admin.findById(adminID).exec();
        //     const name = admin.name;

        //     await socket.to(roomID).emit('admin-connected', name);
        //     console.log(name);
        // })

        socket.on('adminClient', async ({adminID, roomID}) => {
            socket.join(roomID); 

            const admin = await Admin.findById(adminID).exec();
            const name = admin.name; 
            await socket.to(roomID).emit('admin-connected', name);

            socket.on('send-chat-message', async (message) => {
                console.log(name, message);
                socket.to(roomID).emit('chat-message', {message: message, name: name });
            });
        })

        socket.on('join-user-chat', (userId) => {
            console.log(userId); 
        })



        // //send message to user
        // socket.on('send-chat-message', message => {
        //     socket.emit('chat-message', {message: message, name: users[socket.id]})
        //     console.log(message);   

      
    })
}


module.exports = { createSocket, userSocket, adminChatSocket };