const express = require("express");
const fs = require("fs");

const app = express();
const movies = JSON.parse(fs.readFileSync("./movies.json", "utf-8"));

app.get("/", (req, res) => {
  res.status(200).send("Hello I'm from an express folder");
});

// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "Hello I'm from an express folder",
//     status: 200,
//   });
// });

app.get("/api/v1/movies", (req, res) => {
  res.status(200).json({
    status: "success",
    count: movies.length,
    data: {
      movies,
    },
  });
});


const port = 3000;

app.listen(port, (req, res) => {
  console.log("Server already started...");
});