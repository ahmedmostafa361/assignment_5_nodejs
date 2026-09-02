const express = require('express');
const router = express.Router();
const authenticate = require('../../common/middlewares/authenticate');
const {
    createCommentController,
    updateCommentController,
    findOrCreateCommentController,
    getAllCommentsMatchWordController,
    getNewestCommentsController,
    getCommentDetailsByIdController
} = require('./comment.controller');


router.post('/', authenticate,createCommentController);
router.patch('/:commentId', authenticate, updateCommentController);
router.post('/find-or-create', authenticate, findOrCreateCommentController);
router.get('/search', authenticate, getAllCommentsMatchWordController);
router.get('/newest/:postId', authenticate, getNewestCommentsController);
router.get('/details/:commentId', authenticate, getCommentDetailsByIdController);

module.exports = router;