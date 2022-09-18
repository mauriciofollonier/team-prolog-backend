const { Schema, model } = require('mongoose');


const UserSchema = Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: null
    },
    bio: {
        type: String,
        default: null
    },
    phoneNumber: {
        type: Number,
        default: null
    }
})


module.exports = model( 'User', UserSchema );