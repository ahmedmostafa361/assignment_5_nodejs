const { createPostService, deletePostService} = require('./post.service');
const catchAsync = require('../../common/utils/catchAsync');

const createPostController = catchAsync(async (req, res) => {
    await createPostService(req.body, req.userId);

    res.status(201).json({
        message: 'Post created successfully.'
    });
});

const deletePostController = catchAsync(async (req, res) => {
    const { postId } = req.params;
    await deletePostService(postId, req.userId);
    res.status(200).json({ message: 'Post deleted successfully.' });
})
module.exports = { createPostController ,deletePostController };