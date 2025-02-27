const express = require('express')
const usersController = require('../controllers/usersController')
const router = express.Router()
const userAuthorisation = require('../middleware/userAuthorisation')


router.post('/register', usersController.createUser)
router.post('/login', usersController.loginUser)
router.post('/initial', usersController.initialLogin)

router.get('/preferences', userAuthorisation, usersController.fetchPreferences)

router.post('/update-preferences', userAuthorisation, usersController.updatePreferences)

module.exports = router