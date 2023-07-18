const {dbConnect} = require('./services/mongoDb');
const User = require('./models/user.model')
const Admin = require('./models/admin.model');


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

const getAdminChatPage = async (req, res) => { 
    try{
        await dbConnect();

        const users = await User.find({onlineStatus: true});
        console.log("[get admin page]", users);
        res.render(__dirname + '/views/adminChat.ejs', {users: users});
    }catch(err){
        console.log(err);
        res.send('an error is occurred!');
    }
}

const postUserInfo = async (req, res) => {
    try{
        await dbConnect();

        let data = req.body;
        
        const { name, company, email, message } = data;

        if(!name || !company || !email){
            return res.status(500).send('not enough information');
        }

        if(!message){
            data.message = "nothing";
        }

        const history = [`${name}: ${message}`];
        data.history = history;

        data.onlineStatus = false;

        const user = await User.findOneAndUpdate({email: email}, data, {upsert: true, new: true});
        const userID = user._id.toString();

        console.log('online status is: ', data.onlineStatus);
        
        console.log(data);

        res.status(200).json({
            userID
        });
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

        const adminID = admin._id.toString();
        res.status(200).json({
            adminID,
        });
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