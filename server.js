require('dotenv').config();

const app = require('./app');
const http = require('http');
const server = http.createServer(app);
//const io = new Server(server)
const PORT = process.env.PORT;


const redisClient = require('./services/redis');
const {createSocket, userSocket, adminChatSocket} = require('./services/socket')



server.listen(PORT, () => {
    console.log('listening on port 3000');
})

const io = createSocket(server);

userSocket(io);
adminChatSocket(io);