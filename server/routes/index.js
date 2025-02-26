const express = require("express");
const apiRouter = express.Router();

const booksRouter = require("./booksRouter.js")

apiRouter.use('/books', booksRouter)


module.exports = apiRouter;