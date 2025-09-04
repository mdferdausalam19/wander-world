const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware setup for CORS and JSON parsing
app.use(cors());
app.use(express.json());

// MongoDB dependencies and client initialization
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.DATABASE_URI;

// Create a new MongoDB client with configuration
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const database = client.db("wander-world");
    const usersCollection = database.collection("users");

    // API route to save user data
    app.post("/users", async (req, res) => {
      try {
        const user = req.body;
        const query = { uid: user.uid };

        // if existing user try to sign in again
        const existingUser = await usersCollection.findOne(query);
        if (existingUser) {
          return res.status(200).json({
            message: "Registered user found!",
          });
        }
        const result = await usersCollection.insertOne({
          ...user,
          registeredAt: new Date().toISOString(),
        });
        res.status(201).json({
          message: "User added successfully!",
        });
      } catch (err) {
        console.error("Error adding user: ", err.message);
        res.status(500).json({
          message: "Failed to add user.",
        });
      }
    });

    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    // Log any errors during connection or runtime
    console.error("Error connecting to MongoDB: ", err.message);
  }
}

// Run the async function to initialize the database connection and routes
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Welcome to the Wander World Backend API! 🚀");
});

app.listen(port, () => {
  console.log(`Wander World Backend is running on port ${port}`);
});
