const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const axios = require("axios");

// Middleware setup for CORS and JSON parsing
app.use(cors());
app.use(express.json());

// MongoDB dependencies and client initialization
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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

    // API route to update user data
    app.put("/users/:uid", async (req, res) => {
      const { uid } = req.params;
      const user = req.body;
      try {
        const query = { uid: uid };

        // Find the user by uid
        const existingUser = await usersCollection.findOne(query);

        if (!existingUser) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }

        // Update the user in the users collection
        const userUpdateResult = await usersCollection.updateOne(query, {
          $set: user,
        });

        // Update the author of all spots created by the user in the spots collection
        const spotsUpdateResult = await spotsCollection.updateMany(
          { "author.uid": uid },
          { $set: { "author.name": user.name, "author.avatar": user.avatar } }
        );

        res.status(200).json({
          success: true,
          message: "User updated successfully!",
        });
      } catch (err) {
        console.error("Error in /users/:uid endpoint:", err);
        res.status(500).json({
          success: false,
          message: "Failed to update user",
          error: err.message,
        });
      }
    });

    // API route to get all destinations
    app.get("/destinations", async (req, res) => {
      try {
        const destinations = await spotsCollection.find({}).toArray();
        res.status(200).json({
          success: true,
          message: "Destinations fetched successfully!",
          data: destinations,
        });
      } catch (err) {
        console.error("Error in /destinations endpoint:", err);
        res.status(500).json({
          success: false,
          message: "Failed to fetch destinations",
          error: err.message,
        });
      }
    });

    // API route to get a destination by ID
    app.get("/destinations/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const destination = await spotsCollection.findOne({
          _id: new ObjectId(id),
        });
        res.status(200).json({
          success: true,
          message: "Destination fetched successfully!",
          data: destination,
        });
      } catch (err) {
        console.error("Error in /destinations/:id endpoint:", err);
        res.status(500).json({
          success: false,
          message: "Failed to fetch destination",
          error: err.message,
        });
      }
    });

    // API route to get all destination for a specific user
    app.get("/destinations/user/:uid", async (req, res) => {
      try {
        const { uid } = req.params;
        const destinations = await spotsCollection
          .find({ "author.uid": uid })
          .toArray();
        res.status(200).json({
          success: true,
          message: "Destinations fetched successfully!",
          data: destinations,
        });
      } catch (err) {
        console.error("Error in /destinations/:uid endpoint:", err);
        res.status(500).json({
          success: false,
          message: "Failed to fetch destinations",
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

    // API route to update a destination
    app.put("/destinations/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const destination = req.body;
        const result = await spotsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { ...destination, _id: new ObjectId(destination._id) } }
        );
        res.status(200).json({
          success: true,
          message: "Destination updated successfully!",
        });
      } catch (err) {
        console.error("Error in /destination/:id endpoint:", err);
        res.status(500).json({
          success: false,
          message: "Failed to update destination",
          error: err.message,
        });
      }
    });

    // API route to delete a destination
    app.delete("/destinations/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const result = await spotsCollection.deleteOne({
          _id: new ObjectId(id),
        });
        res.status(200).json({
          success: true,
          message: "Destination deleted successfully!",
        });
      } catch (err) {
        console.error("Error in /destination/:id endpoint:", err);
        res.status(500).json({
          success: false,
          message: "Failed to delete destination",
          error: err.message,
        });
      }
    });

    // API route to get weather data
    app.get("/weather", async (req, res) => {
      try {
        const { city, lat, lon } = req.query;

        if (
          (!city && (!lat || !lon)) ||
          (city && (!lat || !lon)) ||
          (!city && lat && lon)
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Please provide either city name OR latitude and longitude",
          });
        }

        const apiKey = process.env.OPENWEATHER_API_KEY;
        if (!apiKey) {
          throw new Error("OpenWeather API key is not configured");
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;

        if (city) {
          url += `&q=${encodeURIComponent(city)}`;
        } else {
          url += `&lat=${lat}&lon=${lon}`;
        }

        const response = await axios.get(url);

        const weatherData = {
          temp: Math.round(response?.data?.main?.temp),
          feels_like: Math.round(response?.data?.main?.feels_like),
          condition: response?.data?.weather?.[0]?.main,
          description: response?.data?.weather?.[0]?.description,
          humidity: response?.data?.main?.humidity,
          wind_speed: Math.round(response?.data?.wind?.speed * 3.6),
          city: response?.data?.name,
          country: response?.data?.sys?.country,
        };

        res.json({
          success: true,
          data: weatherData,
        });
      } catch (error) {
        console.error("Weather API error:", error.message);
        const status = error.response?.status || 500;
        const message =
          error.response?.data?.message || "Failed to fetch weather data";
        res.status(status).json({
          success: false,
          message: message,
        });
      }
    });

    // API route to get the admin stats
    app.get("/admin/stats", async (req, res) => {
      try {
        const totalDestinations = await spotsCollection.countDocuments();
        const destinations = await spotsCollection.find({}).toArray();
        const totalLikes = destinations.reduce(
          (total, destination) => total + destination.likes,
          0
        );
        const totalRegisteredUsers = await usersCollection.countDocuments();
        const totalHosts = await usersCollection.countDocuments({
          role: "Host",
        });
        res.status(200).json({
          success: true,
          message: "Admin stats fetched successfully!",
          data: {
            totalDestinations,
            totalLikes,
            totalRegisteredUsers,
            totalHosts,
          },
        });
      } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({
          success: false,
          message: "Failed to fetch admin stats",
          error: error.message,
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
