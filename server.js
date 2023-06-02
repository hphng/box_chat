const io = require('socket.io')(3000, {
    cors: {
        origin: ["http://127.0.0.1:5500"]
    }
});

//connect to redis server
const redis = require('redis')
const client = redis.createClient({
    legacyMode: true,
});

client.connect().catch(console.error);


var anonymousCount = 1;
const users = {};

//connect to socket io server
io.on('connection', socket => {
    console.log("new user");

    socket.on('new-user', name => {
        users[socket.id] = name;
        //console.log(name);
        //check and make name anonymous
        if(!name){
            name = "Anonymous " + anonymousCount;
            anonymousCount++;
            users[socket.id] = name;
        }

        socket.broadcast.emit('user-connected', name);
        //load history chat
        client.lRange('messages', 0, -1, (error, message) => {
            if(error){
                console.log("error of redis occurred")
            }
            else{
                console.log(message);
                message.reverse().forEach((message) => {
                    socket.emit('history-chat-message', message);
                });
            }
        })
    })

    //send message to user
    const EXPIRETIME = 60*60*24;
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]})
        client.lPush("messages", `${users[socket.id]} : ${message}`)
        client.expireAt("messages", parseInt(+new Date() /1000 ) + EXPIRETIME);
        //console.log(message);
    })

    //send disconnect message to user
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id]; 
    })
})
