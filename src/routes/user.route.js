const express = require('express');
const router = express.Router();
const checkJWT = require("../middlewares/checkJWT");
const { getUsers, getUser, deleteUser, updateUser } = require('../controllers/user.controller');

router.get('/', checkJWT, getUsers);
router.get('/:id', checkJWT, getUser)
router.delete('/:id', checkJWT, deleteUser);
router.put('/:id', checkJWT, updateUser);


module.exports = router;