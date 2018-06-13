//All the required libs...
var express = require('express');
var bodyParser = require('body-parser');
const hbs = require('hbs');
const moment = require('moment');
var path = require('path');
const os = require('os');
const {ObjectID} = require('mongodb');

//External config libs
var {mongoose} = require('./db-conf/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

//we create express app and middleware to parse the html body
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','hbs');

//We create the port for Heroku and a TS
var ts = moment().format('YYYY-MM-DD_HH:mm:ss_Z');
var connected = 0;
const PORT = process.env.PORT||5000;

 //we setup a get route for the home printing out 
app.get('/',(req,res)=>{
    res.render('home.hbs',{ts});
    console.log('Connected to HOME '+ts);
}); 


//Show all the notes
app.get('/todos',(req,res) => {
    Todo.find().then((todos)=>{
        res.send({todos})
    },(e) =>{
        res.status(400).send(e);
    })
}); 

//Find a note per id
app.get('/todos/:id',(req,res) => {
    var id = req.params.id;
if(!ObjectID.isValid(id)){
            res.status(404);// Uncommet this line and comment next line to pass the test..send();
            res.render('404.hbs');
        } else {
            Todo.findById(id).then((todo)=>{
                if(!todo){
                    res.status(404);// Uncommet this line and comment next line to pass the test. .send();
                    res.render('404.hbs');
                } else {
                    //FInally response as an object{...}
                    res.send({todo});
                }
        }).catch((e)=> {
            res.status(400).send();
        })
    }
}); 


app.get('/todos/delete/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.status(404);// Uncommet this line and comment next line to pass the test..send();
        res.render('404.hbs');
    } else {


        Todo.findOneAndRemove(id).then((doc)=>{
            if(doc){
                //console.log('Removed ->'+JSON.stringify(doc,undefined,2));
                res.render('deleted.hbs',{doc});
            } else {
                res.status(404);// Uncommet this line and comment next line to pass the test. .send();
                res.render('404.hbs');
            }
            }
        ).catch((e)=> 
        {
          //console.log(e);
          res.status(400).send();
        });
    }
}); 





//delete a note per id



//Add a new note
app.post('/todos',(req,res)=>{
    todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc)=>{
        console.log(JSON.stringify(doc,undefined,2));
        res.send(doc);
    },(e) =>{
        res.status(400).send(e);
    });
}); 

//Start the server and log info in console
app.listen(PORT,() => {
    var ifaces = os.networkInterfaces();
    Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;
    ifaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
        }

        if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        console.log('Server listening on: '+ifname + ':' + alias, iface.address+' - Port:'+PORT);
        } else {
        // this interface has only one ipv4 adress
        console.log('Server listening on: '+ifname, iface.address+' - Port:'+PORT);
        }
        ++alias;
    });
    });
});

module.exports = {app};


