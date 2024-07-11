const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
const AuthUtils = require("../utils/authUtils");

router.post('/register', AuthController.authRegister);

router.post('/login', AuthController.authLogin);

router.get('/list', AuthUtils.authenticateToken, AuthController.authList);

module.exports = router;