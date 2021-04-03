const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        index: {unique: true}
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    role: {
        type: String,
        default: 'user'
    }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);