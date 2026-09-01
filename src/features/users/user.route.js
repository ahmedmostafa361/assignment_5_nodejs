// src/features/users/user.routes.js
const express = require('express');
const router = express.Router();
const authenticate = require('../../common/middlewares/authenticate');
const { signup, login,createOrUpdateUser,getUserByEmailController ,getUserByIdController} = require('./user.controller');

router.post('/signup', signup);
router.post('/login', login);
router.put('/:id', authenticate, createOrUpdateUser);
router.get('/by-email', authenticate, getUserByEmailController);
router.get('/:id', authenticate, getUserByIdController);
module.exports = router;