const { User, Post } = require('../../common/db/associate');

const createPostService = async (postData, userId) => {
    // Make sure the authenticated user actually exists
    const user = await User.findByPk(userId);

    if (!user) {
        throw new Error('User not found');
    }

    // Create a new Sequelize instance
    const newPost = new Post({
        ...postData,
        userId
    });

    // Save to PostgreSQL
    await newPost.save();

    return newPost;
};
/*
* Delete a post by its id (Ensure that only the owner of the post can perform this action) (0.5 Grade)

o URL: DELETE /posts/:postId

"message": "Post deleted."

"message": "You are not authorized to delete this post."

"message": "Post not found."
* */
const deletePostService = async (postId, userId) => {
    const post = await Post.findByPk(postId);
    if (!post) {
        throw new Error('Post not found');
    }
    if (post.userId !== userId) {
        throw new Error('You are not authorized to delete this post');
    }
    await post.destroy();
    return { message: 'Post deleted.' };
}
module.exports = { createPostService,deletePostService };