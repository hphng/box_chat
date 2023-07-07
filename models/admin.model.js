const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name: 
    {
        type: String,
        required: [true, 'fullname is required'],
        trim: true,
    },
    socketID:
    {
        type: String,
        trim: true,
        required: false,
    }
});

const Admin = mongoose.models.admin || mongoose.model('admin', adminSchema);

module.exports = Admin;