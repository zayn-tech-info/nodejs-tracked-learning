const express = require("express");
const router = express.Router();
const {
  getAllMovies,
  createMovie,
  getMovie,
  updateMovie,
  deleteMovie,
  checkId,
  validation,
} = require("../controllers/products.controllers");

router.param("id", checkId);
router.route("/").get(getAllMovies).post(validation, createMovie);

router.route("/:id").get(getMovie).patch(updateMovie).delete(deleteMovie);

module.exports = router;
