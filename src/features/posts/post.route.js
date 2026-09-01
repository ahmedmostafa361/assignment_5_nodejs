const express = require('express');
const router = express.Router();
const authenticate = require('../../common/middlewares/authenticate');
const { createPostController,deletePostController,getAllPostDetailsController,getPostsWithCommentCountController} = require('./post.controller');

router.post('/', authenticate,createPostController);
router.delete('/:postId', authenticate,deletePostController);
router.get('/details', authenticate,getAllPostDetailsController);
router.get('/comment-count', authenticate,getPostsWithCommentCountController);
module.exports = router;