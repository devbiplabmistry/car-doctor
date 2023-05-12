const cors = require('cors');
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
// Middleware
app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://carDoctor:cukO9FV9QQ18DmJP@cluster0.ovmmvr6.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const usersCollection = client.db('carDoctor').collection('details')
    const serviceCollection = client.db('carDoctor').collection('service')
    app.get('/details', async (req, res) => {
      const cursor = usersCollection.find();
      const result = await cursor.toArray()
      res.send(result)
    })

    app.get('/details/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = {
        projection: { title: 1, img: 1, price: 1 },
      }
      const result = await usersCollection.findOne(query, options);
      res.send(result)
    })
    app.get('/service', async (req, res) => {
      const cursor =serviceCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    app.post('/service', async(req, res) => {
      const ser =req.body;
      console.log(ser);
      const result = await serviceCollection.insertOne(ser);
      res.send(result)
    })












    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);







app.get('/', (req, res) => {
  res.send('Car Doctor server is running now !!!')
})

app.listen(port, () => {
  console.log(`Car Doctor listening on port : ${port}`)
})