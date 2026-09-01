const { User } = require('../../common/db/associate');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async ({ name, email, password, role }) => {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        const error = new Error('Email already exists.');
        error.statusCode = 400;
        throw error;
    }

    const user = User.build({ name, email, password, role });
    await user.save();
    return user;
};


const login = async ({ email, password }) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        const error = new Error('Invalid email or password');
        error.statusCode = 401;
        throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const error = new Error('Invalid email or password');
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign(
        { id: user.id, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    return token;
};

const createOrUpdateUser = async (id, data, skipValidation = false) => {
    let user = await User.findByPk(id);

    if (user) {
        // UPDATE — user already exists
        await user.update(data, { validate: !skipValidation });
        return { user, created: false };
    }

    // CREATE — no user with this id yet
    if (!data.password) {
        const error = new Error('Password is required to create a new user');
        error.statusCode = 400;
        throw error;
    }

    user = User.build({ id, ...data });
    await user.save({ validate: !skipValidation });
    return { user, created: true };
};
/// get user by email
const getUserByEmail = async (email) => {
    let user = await User.findOne({where : email});
    if (!user) return null;
    return user;

}
/// get user by id
const getUserById = async (id) => {
    let user = await User.findByPk(id, {
        attributes: { exclude: ['password','role'] }  /// we use exclude to hide password and role like omit in prisma
    });
    if (!user) return null;
    return user;
}

module.exports = { createUser, login, createOrUpdateUser,getUserByEmail,getUserById };
