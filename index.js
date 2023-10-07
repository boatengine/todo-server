const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/Todo');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://engineboat:boat2548@cluster0.nqksjzs.mongodb.net/test?retryWrites=true&w=majority')
        .then(() => console.log(`connected to mongoDB`))
        .catch(err => console.log(err))

app.get('/get', (req,res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/update/:id' , (req,res) => {
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id: id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id' ,(req,res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))
})


app.listen(3002, () => {
    console.log("server is runing now >>>")
})