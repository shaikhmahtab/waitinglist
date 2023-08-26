
const express = require('express');
const path = require('path');
const fs = require('fs'); // Import the fs module
const { MongoClient, ServerApiVersion } = require('mongodb');
//brew services start mongodb/brew/mongodb-community

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const uri = "mongodb+srv://zayn:zayn@shaikhsapi.cxchbdo.mongodb.net/FromNode?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/addUser', async (req, res) => {
    const { name, age, city } = req.body;
    const newUser = { name, age, city };
    console.log(newUser)
    //waitingList.push(newUser);
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("FromLocalhost");
    const collection = database.collection("WebsiteData");

    const result = await collection.insertOne(newUser);
    console.log(`Inserted ${result.insertedCount} document(s)`);


    res.json(newUser);


    });

/* async function run() {
  try {
   
     // Connect the client to the server	(optional starting in v4.7)
 await client.connect();
 // Send a ping to confirm a successful connection
 await client.db("admin").command({ ping: 1 });
 console.log("Pinged your deployment. You successfully connected to MongoDB!");

 const database = client.db("YourDatabaseName"); // Change to your database name
 const collection = database.collection("YourCollectionName"); // Change to your collection name

        //const newUser = { Name, Age, City };
    // Define the data you want to insert
    const dataToInsert = {
        newUser
      // Add more fields as needed
    };

    // Insert the data
    const result = await collection.insertOne(dataToInsert);
    console.log(`Inserted ${result.insertedCount} document(s)`);

    // Verify the inserted data manually in your MongoDB client


  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}  */
//run().catch(console.dir);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });