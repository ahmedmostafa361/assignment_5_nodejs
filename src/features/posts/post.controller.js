const { createPostService, deletePostService ,getAllPostDetails, getPostsWithCommentCount} = require('./post.service');
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
});

const getAllPostDetailsController = catchAsync(async (req, res) => {
    const posts = await getAllPostDetails();

    res.status(200).json(posts);
});

const getPostsWithCommentCountController = catchAsync(async (req, res) => {
    const posts = await getPostsWithCommentCount();
    res.status(200).json(posts);
})

module.exports = { createPostController ,deletePostController,getAllPostDetailsController,getPostsWithCommentCountController };