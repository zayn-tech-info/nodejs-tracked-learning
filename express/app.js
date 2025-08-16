const express = require("express");
const fs = require("fs");

const app = express();
const movies = JSON.parse(fs.readFileSync("./movies.json", "utf-8"));

app.use(express.json());

const timer = (req, res, next) => {
  req.requestedAT = new Date().toISOString();
  next();
};

app.use(timer);
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

const getAllMovies = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAT: req.requestedAT,
    count: movies.length,
    data: {
      movies,
    },
  });
};

const createMovie = (req, res) => {
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
};

const getMovie = (req, res) => {
  const id = Number(req.params.id);
  const movie = movies.find((movieItem) => movieItem.id === id);

  if (!movie) {
    return res.status(404).json({
      status: "fail",
      message: "Movie with this id " + id + " is not found",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      movie,
    },
  });
};

const updateMovie = (req, res) => {
  const id = Number(req.params.id);
  const movieToUpdate = movies.find((movieItem) => movieItem.id === id);

  if (!movieToUpdate) {
    return res.status(404).json({
      status: "fail",
      message: "Unable to update movie",
    });
  }

  const movie = Object.assign(movieToUpdate, req.body);
  const index = movies.indexOf(movieToUpdate);
  movies[index] = movieToUpdate;

  fs.writeFile("./movies.json", JSON.stringify(movies), () => {
    res.status(200).json({
      status: "success",
      data: {
        movie,
      },
    });
  });
};

const deleteMovie = (req, res) => {
  const id = Number(req.params.id);
  const movieToUpdate = movies.find((movieItem) => movieItem.id === id);

  if (!movieToUpdate) {
    return res.status(404).json({
      status: "fail",
      message: "Unable to delete movie",
    });
  }

  const index = movies.indexOf(movieToUpdate);
  movies.splice(index, 1);

  fs.writeFile("./movies.json", JSON.stringify(movies), () => {
    res.status(200).json({
      status: "success",
      data: {
        movie: null,
      },
    });
  });
};

app.route("/api/v1/movies").get(getAllMovies).post(createMovie);

app
  .route("/api/v1/movies/:id")
  .get(getMovie)
  .patch(updateMovie)
  .delete(deleteMovie);

const port = 3000;

app.listen(port, (req, res) => {
  console.log("Server already started...");
});
