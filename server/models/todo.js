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
        type:String, //To be converted in Number if we want the date as "new Date.GetTime()"
        default: null
    }
});

module.exports = {Todo};