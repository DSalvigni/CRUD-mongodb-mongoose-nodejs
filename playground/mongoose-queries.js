const {mongoose} = require('./../server/db-conf/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js');
const {ObjectID} = require('mongodb');

//var id = '5b1fd9232001cb1b9814277a';
//var id = '5b1fd923ds01cb1b9814277a';
var id = '5b21209f00e8e134bc8cfe15';



// //Return array[{}]
// Todo.find({
//     _id:id
// }).then((todos)=>{
//     if(!todos){
//             console.log('Nothing found');
//         }else{
//         console.log('Todos',todos);
//     }
// });

// //Return document {}
// Todo.findOne({
//     _id:id
// }).then((todos)=>{
//     if(!todos){
//         console.log('Nothing found');
//     }else{
//     console.log('Todos',todos);
// }
// });

//Return document {}

// if(!ObjectID.isValid(id)){
//     console.log('ID Is not valid');
// }

// Todo.findById(id).then((todos)=>{
//     if(!todos){
//         return console.log('Nothing found');
//     }
//     console.log('Todos',todos);

// }).catch((e)=> console.log(e));

// User.findById(id).then((users)=>{
//     if(!users){
//        console.log('Nothing found');
//     }
//     else{
//         console.log('User email',users.email);
//     }
// }).catch((e)=> console.log(e));

// User.findById(id).then((users)=>{
//     if(!users){
//        console.log('Nothing found');
//     }
//     else{
//         console.log('User email',JSON.stringify(users,undefined,2));
//     }
// }).catch((e)=> console.log(e));

Todo.findOneAndRemove(id).then((doc)=>{
    if(doc){
        console.log('Removed ->'+JSON.stringify(doc,undefined,2));
    } else {
        console.log('Nothing to remove');
    }
    }
).catch((e)=> console.log(e));