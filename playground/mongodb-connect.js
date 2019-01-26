// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp')

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err)
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2))
    // })

    //Insert new doc into Users collections
    // db.collection('Users').insertOne({
    //     name: 'Michal',
    //     age: 28,
    //     location: 'FFM'
    // }, (err,result) => {
    //     if(err) {return console.log('Unable to insert new User'), err}

    //     console.log(result.ops[0]._id.getTimestamp());
    // })

    client.close();
});