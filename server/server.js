const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb')

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req,res) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (error) => {
        res.status(400).send(error)
    })
});

app.get('/todos', (req,res) => {
    Todo.find().then((todos) => {
        res.send({todos})
    }, (error) => {
        res.status(400).send(e)
    });
});

//GET todos/UserID
app.get('/todos/:id', (req, res) => {
    let id = req.params.id;
    
    if(!ObjectID.isValid(id)) {
        return res.status(400).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {return res.status(404).send()}
        res.send({todo});
    }).catch((error) => {
        res.status(404).send()
    })
})

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
});

module.exports = {app};