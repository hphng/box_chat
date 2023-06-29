const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    socketId: 
    {
        type: String,
        required: true,
    },
});

const User = mongoose.models.user || mongoose.model('user', userSchema);

module.exports = User;