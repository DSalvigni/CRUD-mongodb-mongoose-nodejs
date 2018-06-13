var mongoose = require('mongoose');

var User = mongoose.model('User',{
    name:{
        type:String,
        required: true,
        minLenght: 1,
        trim: true,
        defualt: '-'
    },
    email:{
        type:String,
        required: true,
        minLenght: 1,
        trim: true,
        defualt: '-'
    },
    completedAt:{
        type:Number,
        default: null
    }
});

module.exports = {User};