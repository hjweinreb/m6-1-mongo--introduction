'use strict';

const { MongoClient } = require('mongodb');

const getCollection = async (req, res) => {
    const { dbName: testDatabase, collection: testCollection } = req.params;

    // create a new client
    const client = new MongoClient('mongodb+srv://dbAdmin:lizard882@cluster0-1tqzq.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    await client.connect();
    const db = client.db(testDatabase);
    console.log("*******", testDatabase, testCollection)

    db.collection(testCollection)
        .find()
        .toArray((err, data) => {
            console.log("Found data: ", data)
            if (err) {
                res.status(404).json({ status: 404, data: 'Not Found' });
            } else {
                res.status(200).json({ status: 200, data: data })
                // TODO: close the connection to the database server
                client.close();
            }
        })
}


module.exports = { getCollection };
