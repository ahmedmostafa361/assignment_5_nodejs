const { User, Post,Comment,sequelize } = require('../../common/db/associate');

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

/*
* 3. Retrieve all posts, including the details of the user who created each post and the associated comments. (Show
only for the post the "id, title", and for user "id, name", and for the comments "id, content") (0.5 Grade)
o URL: GET /posts/details

"id": 1,
"title": "First Post",
"user": {
"name": "John Doe"

"comments": [

"id": 1,
"content": "Great post!"

},
{

"id": 2,
"content": "Thanks for sharing."

}
get all post details
*/
const getAllPostDetails = async () => {
    const posts  = await Post.findAll({
        attributes: ['id', 'title'],
        include: [
            { model: User, attributes: ['id', 'name'] },
            { model: Comment, attributes: ['id', 'content'] }
        ]
    });
    return posts;
}


const getPostsWithCommentCount = async () => {
    const posts = await Post.findAll({
        attributes: [
            'id',
            'title',
            [
                sequelize.fn('COUNT', sequelize.col('Comments.id')),
                'commentCount'
            ]
        ],
        include: [
            {
                model: Comment,
                attributes: [],
                required: false
            }
        ],
        group: ['Post.id', 'Post.title']
    });

    return posts;
};

module.exports = {
    createPostService,
    deletePostService,
    getAllPostDetails,
    getPostsWithCommentCount
};
