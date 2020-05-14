'use strict';

const { MongoClient } = require('mongodb');
const assert = require('assert');


const createGreeting = async (req, res) => {
    const client = new MongoClient('mongodb+srv://dbAdmin:lizard882@cluster0-1tqzq.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    try {
        await client.connect();
        const db = client.db('exercises');

        const r = await db.collection('greetings').insertOne(req.body);
        assert.equal(1, r.insertedCount);
        res.status(201).json({ status: 201, data: req.body });
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    client.close();
};

const getGreeting = async (req, res) => {
    const client = new MongoClient('mongodb+srv://dbAdmin:lizard882@cluster0-1tqzq.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });


    let _id = req.params._id
    await client.connect();


    console.log(_id)

    const db = client.db('exercises');


    await db.collection('greetings').findOne({ _id }, (err, result) => {
        result
            ? res.status(200).json({ status: 200, _id, data: result })
            : res.status(404).json({ status: 404, _id, data: 'Not Found' });
        client.close();
    });


    //res.status(200).json('bacon');
};


module.exports = { createGreeting, getGreeting };