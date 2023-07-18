const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: 
    {
        type: String,
        required: [true, 'fullname is required'],
        trim: true,
    },
    company:
    {
        type: String,
        required: [true,"company name is required"],
        trim: true,
    },
    email:
    {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "email address is required"],
        unique: true,
    },
    message:
    {
        type: String,
        required: false,
        trim: true,
    },
    history:
    [{
        type: String,
    }],
    onlineStatus:
    {
        type: Boolean,
        required: false,
        default: false,
    }
});

const User = mongoose.models.user || mongoose.model('user', userSchema);

module.exports = User;