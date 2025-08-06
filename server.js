const express = require('express');
const cors = require('cors');
const { TaskModel } = require("./src/models/taskModel");
const { db } = require('./src/data/connection');
const { v4: uuidv4 } = require('uuid');


const app = express();
const port = 3000;
const path = require('path');
const uuid = uuidv4();

// app.use(express.static(path.join(__dirname, 'public'))); TODO remove
app.use(cors());
app.use(express.json());

app.get('/task', (req, res) => {
    res.send('Tasks!');
})

app.post('/task/newTask', async (req, res) => {
    try {
        const newTask = await TaskModel.create({title: req.body.title, desc:req.body.desc, status:req.body.status, due: req.body.due})
        res.status(200).send(`Successfully created new Task: ${newTask.id}`);
    }
    catch(e) {
        console.error("Error creating task " + e);
        res.send("Internal server error")
    }
});

app.get('/task/all', async (req, res) => {
    try {
    const result = await TaskModel.findAll()
    res.send(JSON.stringify(result));
    } catch {
        console.error("No records found")
        res.send("Internal server error")
    }
});

app.get('/task/:id', async (req, res) => {
    try{
        const result = await TaskModel.findOne({where: {id: req.params.id}});
        res.status(200).send(result);
    }
    catch(e) {
        console.error(e)
        res.send("Internal server error")
    }
})

app.put('/task/:id',async (req, res) => {
    try{
        const findTask = await TaskModel.update({status: req.body.status},{where: {id: req.params.id}});
        res.status(200).send("Status updated");
    }
    catch(e) {
        console.error(e)
        res.send("Internal server error")
    }
})

app.delete('/task/:id',async (req, res) => {
    try{
        const findTask = await TaskModel.destroy({where: {id: req.params.id}});
        res.status(200).send(`Task ID: ${req.params.id} deleted`);
    }
    catch(e) {
        console.error(e)
        res.send("Internal server error")
    }
})

app.listen(port, () => {
    db.sync();
    console.log('Listening on port ' + port);
})
