import {
  create,
  deleteAll,
  deleteOne,
  findAll,
  findAllFavorite,
  findOne,
  update,
} from "../controllers/contact.controller";
const express = require("express");

const router = express.Router();

router.route("/").get(findAll).post(create).delete(deleteAll);

router.route("/favorite").get(findAllFavorite);

router.route("/:id").get(findOne).put(update).delete(deleteOne);

module.exports = router;
