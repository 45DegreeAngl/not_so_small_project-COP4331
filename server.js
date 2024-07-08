const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000; //--------------------------------------> remember to change back

app.set("port", PORT);
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

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
