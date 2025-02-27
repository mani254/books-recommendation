const express = require("express");
const apiRouter = express.Router();

const booksRouter = require("./booksRouter.js")
const usersRouter = require('./usersRouter.js')

apiRouter.use('/books', booksRouter)
apiRouter.use('/users', usersRouter)


module.exports = apiRouter;