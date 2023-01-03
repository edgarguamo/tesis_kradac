var express = require('express');
var router = express.Router();
var authController = require('../../controllers/api/auth.controller');

router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;