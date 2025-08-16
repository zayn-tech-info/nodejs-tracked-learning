const fs = require("fs");

const movies = JSON.parse(fs.readFileSync("./movies.json", "utf-8"));

exports.checkId = (req, res, next, value) => {
  const movie = movies.find((movieItem) => movieItem.id === Number(value));

  if (!movie) {
    return res.status(404).json({
      status: "fail",
      message: "Movie with this id " + Number(value) + " is not found",
    });
  }

  next();
};

exports.getAllMovies = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAT: req.requestedAT,
    count: movies.length,
    data: {
      movies,
    },
  });
};

exports.createMovie = (req, res) => {
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

exports.getMovie = (req, res) => {
  const id = Number(req.params.id);
  const movie = movies.find((movieItem) => movieItem.id === id);

  /*   if (!movie) {
    return res.status(404).json({
      status: "fail",
      message: "Movie with this id " + id + " is not found",
    });
  } */
  res.status(200).json({
    status: "success",
    data: {
      movie,
    },
  });
};

exports.updateMovie = (req, res) => {
  const id = Number(req.params.id);
  const movieToUpdate = movies.find((movieItem) => movieItem.id === id);

  /*   if (!movieToUpdate) {
    return res.status(404).json({
      status: "fail",
      message: "Unable to update movie",
    });
  } */

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

exports.deleteMovie = (req, res) => {
  const id = Number(req.params.id);
  const movieToUpdate = movies.find((movieItem) => movieItem.id === id);

  /*   if (!movieToUpdate) {
    return res.status(404).json({
      status: "fail",
      message: "Unable to delete movie",
    });
  } */

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
