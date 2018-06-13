var mongoose = require('mongoose');

var Todo = mongoose.model('Todo',{
    text:{
        type:String,
        required: true,
        minLenght: 1,
        trim: true,
        defualt: '-'
    },
    completed:{
        type:Boolean,
        required: true,
        default: false
    },
    completedAt:{
        type:Number,
        default: null
    }
});

module.exports = {Todo};