const {Comment, Post, User} = require('../../common/db/associate');
const {Op} = require('sequelize');

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
const updateCommentService = async (commentId, userId, content) => {
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
        throw new Error('Comment not found');
    }
    if (comment.userId !== userId) {
        throw new Error('You are not authorized to update this comment');
    }
    comment.content = content;
    await comment.save();
    return {message: 'Comment updated.'};
}

const findOrCreateComment = async (postId, userId, content) => {
    const post = await Post.findByPk(postId);

    if (!post) {
        throw new Error('Post not found');
    }
    const [comment, created] = await Comment.findOrCreate({
        where: {postId, userId, content},
        defaults: {postId, userId, content}
    });
    return {comment, created};
}

const getAllCommentsMatchWord = async (word) => {
    const comments = await Comment.findAll(
        {
            where: {
                content: {
                    [Op.iLike]: `%${word}%`
                }
            }
        }
    );
    if (comments.length === 0) {
        return {count: 0, comments: []};
    }
    const count = await Comment.count({
        where: {
            content: {
                [Op.iLike]: `%${word}%`
            }
        }
    });
    return ({
        count,
        comments
    })
}

const getNewestComments = async (postId) => {
    if (!postId) {
        throw new Error('Post ID is required');
    }
    const post = await Post.findByPk(postId);
    if (!post) {
        throw new Error('Post not found');
    }

    const comments = await Comment.findAll({
        where: {postId},
        order: [['createdAt', 'DESC']],
        limit: 3,
        attributes: ['id', 'content', 'createdAt']
    });
    return comments;
}

/* o

6. Get Specific Comment By PK with User and Post Information. (0.5 Grade)
URL: GET /comments/details/:id

"id": 1,
"content": "This is a great post!",
"user": {
"id": 1,
"name": "John Doe",
"email": "john@example.com"

post": {
"id": 1,
"title": "First Post",
"content": "This is the content of the first post."

"message": "no comment found"*/
const getCommentDetailsById = async (commentId) => {
    const comment = await Comment.findByPk(commentId, {
        attributes: ['id', 'content'],
        include: [
            {model: User, attributes: ['id', 'name', 'email']},
            {model: Post, attributes: ['id', 'title', 'content']}
        ]
    });
    if (!comment) {
        throw new Error('no comment found');
    }

    return comment;
}


module.exports = {
    createComments,
    updateCommentService,
    findOrCreateComment,
    getAllCommentsMatchWord,
    getNewestComments,
    getCommentDetailsById
};