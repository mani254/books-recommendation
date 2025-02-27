const express = require("express");
const { getRecommendedBooks } = require("../controllers/recomendationsController");
const userAuthorisation = require('../middleware/userAuthorisation')

const router = express.Router();


router.get("/", userAuthorisation, getRecommendedBooks);

module.exports = router;