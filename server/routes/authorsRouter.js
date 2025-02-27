const express = require("express");
const router = express.Router();
const authorsController = require("../controllers/authorsController");

router.get("/", authorsController.getAuthors);

module.exports = router;
