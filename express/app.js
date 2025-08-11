const express = require("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.status(200).send("Hello I'm from an express folder");
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello I'm from an express folder",
    status: 200,
  });
});

app.listen(port, (req, res) => {
  console.log("Server already started...");
});
