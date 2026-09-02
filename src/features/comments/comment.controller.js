const {
    createComments, updateCommentService, findOrCreateComment, getAllCommentsMatchWord, getNewestComments,
    getCommentDetailsById
} = require('./comment.service');
const catchAsync = require('../../common/utils/catchAsync');

const createCommentController = catchAsync(async (req, res) => {
    const result = await createComments(req.body, req.userId);

    res.status(201).json({
        message: 'Comment created successfully.',
        comments: result
    });
});

const updateCommentController = catchAsync(async (req, res) => {
    const {content} = req.body;
    const result = await updateCommentService(req.params.commentId, req.userId, content);
    res.status(200).json({
        message: 'Comment updated successfully.',
        comments: result
    });

});
const findOrCreateCommentController = catchAsync(async (req, res) => {
    const {postId, content} = req.body;

    const result = await findOrCreateComment(postId, req.userId, content);
    res.status(200).json(result)
})
const getAllCommentsMatchWordController = catchAsync(async (req, res) => {
    const {word} = req.query;
    const result = await getAllCommentsMatchWord(word);
    if (result.count === 0) {
        return res.status(404).json({message: 'No comments found with the specified word.'});
    }
    res.status(200).json(result);
});
const getNewestCommentsController = catchAsync(async (req, res) => {
    const {postId} = req.params;
    const comments = await getNewestComments(postId);
    if (!comments) {
        throw new Error('no comments found');
    }
    if (comments.length === 0) {
        throw new Error('no comments found');
    }
    res.status(200).json(comments);
});
const getCommentDetailsByIdController = catchAsync(async (req, res) => {
    const {commentId} = req.params;
    if (!commentId) {
        throw new Error('commentId is required');
    }
    const comment = await getCommentDetailsById(commentId);
    if (!comment) {
        throw new Error('no comment found');
    }
    res.status(200).json(comment);
})

module.exports = {
    createCommentController,
    updateCommentController,
    findOrCreateCommentController,
    getAllCommentsMatchWordController,
    getNewestCommentsController,
    getCommentDetailsByIdController
};