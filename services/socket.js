
const uuid = require('uuid');
const {Server} = require('socket.io');

const socket = async (server) => {
    const io = new Server(server);
    const users = {};
    const getName = (socketid) => {
        return users[socketid]? "User":"Admin";
    }

    const userNameSpace = io.of('/user');
    //connect to socket io server 
    userNameSpace.on('connection', (socket) => {
        socket.on('new-user', async (roomID) => {
            //await dbConnect();
            let name = 'User';
            const Id = uuid.v4();
            if(roomID){
                name = 'Admin';
            } else{
                //const socketUser = new User(); 
                users[socket.id] = Id;
                //socketUser.socketId = socket.id;
                //console.log(socketUser);
                //socketUser.save();
            }

            //console.log(users);
            await socket.to(roomID).emit('user-connected', name);
        })

        socket.on('join-room', async (roomID) => {
            console.log("new user");

            if(roomID === ''){
                roomID = users[socket.id];
            }


            socket.join(roomID); 
            console.log(roomID);

            const map = new Map();
            socket.on('send-chat-message', async (message) => {
                console.log(message, roomID);
                map.set(roomID, message); 

                socket.to(roomID).emit('chat-message', {message: message, name: getName(socket.id) });
            }); 



        // //send message to user
        // socket.on('send-chat-message', message => {
        //     socket.emit('chat-message', {message: message, name: users[socket.id]})
        //     console.log(message);   
        })

        socket.on('disconnected', async (roomID) => {
            if(!roomID){
                roomID = users[socket.id];
            }
            socket.on('disconnect', () => {
                socket.to(roomID).emit('user-disconnected',  getName(socket.id));
                delete users[socket.id]; 
            })
        })
      
    })
}

module.exports = { socket };