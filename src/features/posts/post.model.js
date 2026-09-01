const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../common/db/sequelize.js');

class Post extends Model {}

Post.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',   // the actual table name, not the model name
            key: 'id'
        },
        onDelete: 'CASCADE'   // if the users is deleted, their posts go too
    }
}, {
    sequelize,          // tell this model which connection to use
    modelName: 'Post',
    tableName: 'posts',
    paranoid: true       // soft delete
});

module.exports = Post;