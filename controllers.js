const {dbConnect} = require('./services/mongoDb');
const User = require('./models/user.model')

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

const postUserInfo = async (req, res) => {
    try{
        await dbConnect();

        let data = req.body;
        
        const name = data.name;
        const company = data.company;
        const email = data.email;
        const message = data.message;

        if(!name || !company || !email|| !message){
            return res.status(500).send('asadsadsasd');
        }
        
        console.log(data);
        console.log(123);
        res.send(data);
    }catch(err){
        console.log(err);
        res.send('an error is occurred!');
    }
}

const postAdminInfo = (req, res) => {
    try{
        const data = req.body;
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
    postUserInfo,
    postAdminInfo,
};