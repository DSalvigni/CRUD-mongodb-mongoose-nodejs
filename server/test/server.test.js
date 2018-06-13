//To run test in console: npm run test-watch
//Note that "test-watch" is defined in package.json
const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');


const {app} = require('./../server.js');
const {Todo} = require('./../models/todo.js');
const todos = [{
                    _id: new ObjectID(),
                    text:'Test TODO text by using supertest'
                },{
                    _id: new ObjectID(),
                    text:'secondo test todo'
                }];


//We need to be sure that the database is empty otherway the test fail
beforeEach((done)=>{
    Todo.remove({}).then(()=>{
        Todo.insertMany(todos);
        //done();
    }).then(()=> done());

});

//We start our test case...to run it launch "npm run  test-watch (As in the package.json test description"
describe('POST /todos', ()=>{
    it('Sould create a new TODO entry',(done)=>{
        var text = 'Test TODO text by using supertest';
        request(app)
        .post('/todos')
        //We are sending by POST the text defined above. JSON method is not required by supertest
        .send({text})
        //we expect the status code 200
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text);
        })
        .end((err,res) =>{
            if(err){
               return done(err);
            }
            //we check if the text above 'Test TODO...' is in the DB
            Todo.find({text}).then((todos)=>{
                //We expect that the text is present in the DB and it comes back. SO we get 12 result
                expect(todos.length).toBe(2);
                //we expect that the same text variable provided is present in the DB
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e)=>{
                done(e);
            });
        });
    });

    //Second test case
    it('Should not create TODO with invalid body data', (done)=>{
        request(app)
        .post('/todos')
        //I pass an empty text
        .send({})
        .expect(400)
        .end((err,res) => {
            if(err){
            return done(err);
            }
            Todo.find().then((todos)=>{
            //We expect 0 as result from the DB
            expect(todos.length).toBe(2);
            done();
            }).catch((e)=>{
                done(e);
        });
    });
});


describe('GET /todos',() => {
    it('Should get all todos',(done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res)=>{
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});


describe('GET /todos/:id',()=>{

        it('Should return a doc',(done) => {
            request(app)
            .get('/todos/'+todos[0]._id.toHexString())
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
        });


        it('Should return 404 if todo not found',(done)=> {
            var failure_id = new ObjectID().toHexString;
            request(app)
            .get('/todos/'+failure_id)
            .expect(404)
            .end(done);
        });

        it('Should return 404 if not-objects',(done)=> {
            request(app)
            .get('/todos/123abc')
            .expect(404)
            .end(done);
        });
    });
    



});





