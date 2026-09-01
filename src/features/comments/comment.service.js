const { Comment, Post } = require('../../common/db/associate');

const createComments = async (comments, userId) => {
    // Make sure the request body is an array
    if (!Array.isArray(comments) || comments.length === 0) {
        throw new Error('Comments must be a non-empty array');
    }

    // Check that every post exists
    for (const comment of comments) {
        const post = await Post.findByPk(comment.postId);

        if (!post) {
            throw new Error(`Post ${comment.postId} not found`);
        }
    }

    // Add the authenticated userId to every comment
    const commentsWithUser = comments.map(comment => ({
        ...comment,
        userId
    }));

    // Bulk insert
    const newComments = await Comment.bulkCreate(commentsWithUser);

    return newComments;
};

module.exports = { createComments };