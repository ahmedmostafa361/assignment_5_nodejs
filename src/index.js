// src/index.js (updated)
const express = require('express');
const { sequelize } = require('./common/db/associate');
const userRoutes = require('./features/users/user.route');
const postRoutes = require('./features/posts/post.route');
const commentRoutes = require('./features/comments/comment.route');
const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/posts', postRoutes)
app.use('/comments', commentRoutes)


/// handle invalid routes
app.use((req, res, next) => {
    res.status(404).json({ message: "Invalid route", success: false });
});

/// handle global errors
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message, success: false });
});

(async () => {
    await sequelize.sync({ alter: true });
    console.log('✅ Tables synced');
    app.listen(3000, () => console.log('🚀 Server running on port 3000'));
})();