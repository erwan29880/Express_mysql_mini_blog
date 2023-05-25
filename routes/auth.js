const express = require('express');
const controller = require('../controller/auth')
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// routes pour les formualaires de connection et d'enregistrement

router.post('/signin', urlencodedParser, controller.signInPost)
router.get('/signin', controller.signIn)
router.post('/login', urlencodedParser, controller.logInPost)
router.get('/login', controller.logIn)
router.get('/logout', controller.logOut)

module.exports = router