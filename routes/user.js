const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// User routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
