const MongoClient = require('mongodb').MongoClient;

const dbFunction = async (dbName) => {
    // create a new client
    const uri = "mongodb+srv://dbAdmin:lizard882@cluster0-1tqzq.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    // open the connection to the database server
    await client.connect();
    console.log('connected!');

    const db = client.db(dbName);

    await db.collection('one').insertOne({ name: 'Mr. Test' });

    // close the connection to the database server
    client.close();
    console.log('disconnected!');
};

dbFunction('exercise_one');


/* const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbAdmin:<password>@cluster0-1tqzq.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
}); */
