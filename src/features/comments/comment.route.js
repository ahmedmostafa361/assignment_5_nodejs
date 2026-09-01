const express = require('express');
const router = express.Router();
const authenticate = require('../../common/middlewares/authenticate');
const {createCommentController } = require('./comment.controller');


router.post('/', authenticate,createCommentController);

module.exports = router;