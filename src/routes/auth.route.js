const express = require('express');
const router = express.Router();
const { register } = require('../controllers/register.controller');
const { login } = require('../controllers/login.controller');

router.post('/register', register);
router.post('/login', login);


module.exports = router;