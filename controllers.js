const {dbConnect} = require('./services/mongoDb');
const User = require('./models/user.model')
const Admin = require('./models/admin.model');
const io = require('socket.io-client');



const getHomePage = (req, res) => {
    res.sendFile(__dirname + '/index.html');
};

const getUserPage = (req, res) => {
    res.sendFile(__dirname +'/public/user.html');
}

const getUserInfoPage = (req, res) => {
    res.sendFile( __dirname + '/public/userInfo.html');
}

const getAdminInfoPage = (req, res) => {
    res.sendFile(__dirname + '/public/adminInfo.html');
}

const getAdminChatPage = (req, res) => {
    res.sendFile(__dirname + '/public/adminChat.html');
}

const postUserInfo = async (req, res) => {
    try{
        //await dbConnect();

        const socket = io('http://localhost:3000/adminChat')

        let data = req.body;
        
        const name = data.name;
        const company = data.company;
        const email = data.email;
        const message = data.message;

        if(!name || !company || !email){
            return res.status(500).send('asadsadsasd');
        }

        if(!message){
            data.message = "nothing";
        }

        socket.emit('data', data);
        //const user = new User(data);
        
        
        console.log(data);
        console.log(user._id.toString());

        //await user.save();
        res.send(data);
    }catch(err){
        console.log(err);
        res.send('an error is occurred!');
    }
}

const postAdminInfo = async (req, res) => {
    try{
        await dbConnect();

        const data = req.body;

        if(!data){
            return res.status(404).send("cannot find admin");
        }

        const admin = new Admin(data);

        await admin.save();
        console.log(data);
        res.send(data);
    }catch(err){
        console.log(err);
        res.send('an error is occurred!');
    }
}


module.exports = {
    getHomePage,
    getUserInfoPage,
    getUserPage,
    getAdminInfoPage,
    getAdminChatPage,
    postUserInfo,
    postAdminInfo,
};