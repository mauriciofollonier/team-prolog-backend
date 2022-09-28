const { Schema, model } = require('mongoose');


const UserSchema = Schema({

    name: {
        type: String,
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
    },
    bio: {
        type: String,
    },
    phoneNumber: {
        type: String,
    }
})


module.exports = model( 'User', UserSchema );