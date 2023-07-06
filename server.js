require('dotenv').config();

const app = require('./app');
const http = require('http');
const server = http.createServer(app);

const PORT = process.env.PORT;

const {socket} = require('./services/socket')

server.listen(PORT, () => {
    console.log('listening on port 3000');
})

socket(server);
