const express = require('express')
const usersController = require('../controllers/usersController')
const router = express.Router()

router.post('/register', usersController.createUser)
router.post('/login', usersController.loginUser)
router.post('/initial', usersController.initialLogin)


module.exports = router