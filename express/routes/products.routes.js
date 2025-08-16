const express = require("express");
const router = express.Router();
const {
  getAllMovies,
  createMovie,
  getMovie,
  updateMovie,
  deleteMovie,
  checkId,
} = require("../controllers/products.controllers");


router.param('id', checkId)
router.route("/").get(getAllMovies).post(createMovie);

router.route("/:id").get(getMovie).patch(updateMovie).delete(deleteMovie);

module.exports = router;
