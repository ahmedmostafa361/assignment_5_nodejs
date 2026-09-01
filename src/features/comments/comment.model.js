// src/features/comments/comments.model.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../common/db/sequelize.js');

class Comment extends Model {}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'posts',
            key: 'id'
        },
        onDelete: 'CASCADE'   // if a posts is deleted, its comments go too
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'CASCADE'   // if a users is deleted, their comments go too
    }
}, {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments'
});

module.exports = Comment;