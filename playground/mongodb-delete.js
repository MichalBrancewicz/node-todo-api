// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp')

    //deleteMany
    // db.collection('Users').deleteMany({name:'Lojtek'}).then((result) => {
    //     console.log(result);
    // })

    //deleteOne - deletes first item that matches the criteria and then stops
    // db.collection('Users').deleteOne({name:'Maya'}).then((result) => {
    //     console.log(result);
    // });

    //findOneAndDelete
    // db.collection('Users').findOneAndDelete({_id: new ObjectID("5c4ca3d9a4e0ea95dd9702d8")}).then((result) => {
    //     console.log(result);
    // });

    //client.close();
});