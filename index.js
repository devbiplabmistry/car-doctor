const cors = require('cors');
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
// Middleware
app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion } = require('mongodb');
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