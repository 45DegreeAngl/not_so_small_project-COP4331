const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const { MongoClient, ObjectId } = require('mongodb');

const path = require('path');
const bcrypt = require('bcrypt');
const nodeMailer = require('nodemailer');
const PORT = process.env.PORT || 4000;

//const { ObjectId } = require('mongodb');

const app_name = 'ganttify-5b581a9c8167';

const app = express();

app.set('port', (process.env.PORT || 4000));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

require('dotenv').config();
const url = process.env.MONGODB_URI;

//const MongoClient = require('mongodb').MongoClient;

let client;
(async () => {
  try {
    client = new MongoClient(url);
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
})();

const apiRouter = require("./api");

app.use("/api", apiRouter);

// For Heroku deployment
app.use(express.static(path.join(__dirname, "frontend", "build")));
// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
}

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS",
  );
  next();
});

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});