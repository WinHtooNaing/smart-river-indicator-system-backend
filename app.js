const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const appRoute = require("./route/app")
const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use(appRoute);


// MongoDB connect
mongoose.connect("mongodb+srv://winhtoonaing2003:phamana252313@cluster0.hej7jdo.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    app.listen(8080);
    console.log("database server connected!! ");
  })
  .catch(() => {
    console.log("Database connection failed!!");
  });
