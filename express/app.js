const express = require("express");
const productsRoute = require("./routes/products.routes");

const app = express();
app.use(express.json());
app.use("/api/v1/movies", productsRoute);

const timer = (req, res, next) => {
  req.requestedAT = new Date().toISOString();
  next();
};

app.use(timer);

module.exports = app;
