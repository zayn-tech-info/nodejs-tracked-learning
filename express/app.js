const express = require("express");
const mongoose = require("mongoose");
const productsRoute = require("./routes/products.routes");

const app = express();
app.use(express.json());
app.use("/api/v1/movies", productsRoute);

const timer = (req, res, next) => {
  req.requestedAT = new Date().toISOString();
  next();
};

mongoose
  .connect(process.env.DB_CONNECTION_STRING, { 
    useNewUrlParser: true,
    // useUnifiedTopology: true 
  })
  .then((response) => {
    // console.log(response);
    console.log("Database connected succefully");
  })
  .catch((err) => {
    console.log("An error occured: " + err);
  });

app.use(timer);

module.exports = app;
