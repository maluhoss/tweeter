"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

/*The database of tweets connected to a Mongo Database. Contains:
  -Tweet Routes - Post and Get requests for Tweets
  -Data Helper Function - Contains Get Tweets and Save Tweets Functions*/
MongoClient.connect(MONGODB_URI, (err, db) => {
  const DataHelpers = require("./lib/data-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  app.use("/tweets", tweetsRoutes);

  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
      throw err;
    };

  console.log(`Connected to mongodb: ${MONGODB_URI}`);
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
