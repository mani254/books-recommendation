const express = require("express");
const apiRouter = express.Router();

const booksRouter = require("./booksRouter.js")
const usersRouter = require('./usersRouter.js')
const genresRouter = require('./genresRouter.js')
const authorsRouter = require('./authorsRouter.js')
const recomendationsRouter = require('./recomendations.js')

apiRouter.use('/books', booksRouter)
apiRouter.use('/users', usersRouter)
apiRouter.use('/genres', genresRouter)
apiRouter.use('/authors', authorsRouter)
apiRouter.use('/recommendations', recomendationsRouter)

module.exports = apiRouter;