// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp')

    //  db.collection('Todos').findOneAndUpdate({
    //      _id: new ObjectID("5c4c9d84a4e0ea95dd9701af")
    //     }, {
    //         $set: {
    //             completed: true
    //         }
    //     }, {
    //         returnOriginal: false
    //     }).then((result) => {
    //         console.log(result)
    //     })

    db.collection('Users').findOneAndUpdate({
        name: 'Michal'
    },{
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result)=>{
        console.log(result)
    })

    //client.close();
});