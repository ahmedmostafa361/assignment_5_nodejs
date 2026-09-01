const { createComments } = require('./comment.service');
const catchAsync = require('../../common/utils/catchAsync');

const createCommentController = catchAsync(async (req, res) => {
    const result = await createComments(req.body, req.userId);

    res.status(201).json({
        message: 'Comment created successfully.',
        comments: result
    });
});

module.exports = { createCommentController };