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
    const spotsCollection = database.collection("spots");

    // API route to save user data
    app.post("/users", async (req, res) => {
      try {
        const user = req.body;

        if (!user.uid || !user.email) {
          return res.status(400).json({
            success: false,
            message: "Missing required fields: uid and email are required",
          });
        }

        const query = { uid: user.uid };
        const existingUser = await usersCollection.findOne(query);

        if (existingUser) {
          if (
            (!existingUser.name || existingUser.name === "New User") &&
            user.name
          ) {
            const updateResult = await usersCollection.updateOne(
              { _id: existingUser._id },
              {
                $set: {
                  name: user.name,
                  updatedAt: new Date().toISOString(),
                },
              }
            );
          }
          return res.status(200).json({
            success: true,
            message: "User processed successfully",
            isNew: false,
          });
        }

        const newUser = {
          uid: user.uid,
          name: user.name || "New User",
          email: user.email,
          avatar: user.avatar || "https://i.ibb.co/9H2PJ7h2/d43801412989.jpg",
          role: user.role || "General",
          registeredAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        const result = await usersCollection.insertOne(newUser);

        res.status(201).json({
          success: true,
          message: "User added successfully!",
          isNew: true,
        });
      } catch (err) {
        console.error("Error in /users endpoint:", err);
        res.status(500).json({
          success: false,
          message: "Failed to process user data",
          error: err.message,
        });
      }
    });

    // API route to add a destination
    app.post("/destinations", async (req, res) => {
      try {
        const destination = req.body;

        if (
          !destination.name ||
          !destination.imageUrl ||
          !destination.location
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Missing required fields: name, image, and location are required",
          });
        }

        const result = await spotsCollection.insertOne(destination);

        res.status(201).json({
          success: true,
          message: "Destination added successfully!",
        });
      } catch (err) {
        console.error("Error in /destinations endpoint:", err);
        res.status(500).json({
          success: false,
          message: "Failed to process destination data",
          error: err.message,
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
