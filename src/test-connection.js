// src/test-connection.js
const sequelize = require('./common/db/sequelize.js');

// just requiring these will throw if there's a typo/syntax error
require('./features/users/user.model');
require('./features/posts/post.model');
require('./features/comments/comment.model');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Connected to Postgres successfully.');
    } catch (err) {
        console.error('❌ Connection failed:', err.message);
    } finally {
        await sequelize.close();
    }
})();