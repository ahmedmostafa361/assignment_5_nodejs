const express = require('express');
const router = express.Router();
const authenticate = require('../../common/middlewares/authenticate');
const { createPostController,deletePostController } = require('./post.controller');

router.post('/', authenticate,createPostController);
router.delete('/:postId', authenticate,deletePostController);

module.exports = router;