const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/pride-parlor', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const Events = mongoose.model('Events', {
    name: {type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    summary: {
        type: String,
        required: true,
        trim: true,
    },
    img: {
         data: Buffer, 
         contentType: String 
    },
    time: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    cost: {
        type: String,
        required: true,
        trim: true,
    },
})

module.exports = Events