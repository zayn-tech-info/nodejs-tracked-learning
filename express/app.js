const express = require("express");
const fs = require("fs");

const app = express();
const movies = JSON.parse(fs.readFileSync("./movies.json", "utf-8"));

app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).send("Hello I'm from an express folder");
});

/* app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello I'm from an express folder",
    status: 200,
  });
});
 */

app.get("/api/v1/movies", (req, res) => {
  res.status(200).json({
    status: "success",
    count: movies.length,
    data: {
      movies,
    },
  });
});

app.post("/api/v1/movies", (req, res) => {
  const newId = movies[movies.length - 1].id + 1;
  console.log(newId);

  const movie = Object.assign({ id: newId }, req.body);
  movies.push(movie);

  fs.writeFile("./movies.json", JSON.stringify(movies), (_, data) => {
    res.status(201).json({
      status: "success",
      data: {
        movie,
      },
    });
  });
});

app.get("/api/v1/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const movie = movies.find((movieItem) => movieItem.id === id);

  if (!movie) {
    res.status(404).json({
      status: "success",
      message: "Movie with this id " + id + " is not found",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      movie,
    },
  });
});

app.patch("/api/v1/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const movieToUpdate = movies.find((movieItem) => movieItem.id === id);

  const movie = Object.assign(movieToUpdate, req.body);
  const index = movies.indexOf(movieToUpdate);

  if(!movie){
    res.status(404).json({
      status: 'fail',
      message: 'Unable to update movie'
    })
  }
  movies[index] = movieToUpdate;

  fs.writeFile('./movies.json', JSON.stringify(movies), ()=>{
    res.status(200).json({
      status: 'success', 
      data:{
        movie
      }
    })
  })
});

const port = 3000;

app.listen(port, (req, res) => {
  console.log("Server already started...");
});
