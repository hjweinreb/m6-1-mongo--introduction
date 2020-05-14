const fs = require('file-system');
const { MongoClient } = require('mongodb');
const assert = require('assert');

const greetings = JSON.parse(fs.readFileSync('data/greetings.json'));

const batchImport = async () => {
    console.log("here are greetings", greetings);

    const uri = "mongodb+srv://dbAdmin:lizard882@cluster0-1tqzq.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    // open the connection to the database server
    await client.connect();
    console.log('connected!');

    const db = client.db('exercises');

    const r = await db.collection('greetings').insertMany(greetings);
    assert.equal(greetings.length, r.insertedCount);

    // close the connection to the database server
    client.close();
    console.log('disconnected!');

}


batchImport();
