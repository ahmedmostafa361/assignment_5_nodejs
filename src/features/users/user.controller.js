const userService = require('./user.service');
const catchAsync = require('../../common/utils/catchAsync');

const signup = catchAsync(async (req, res) => {
    await userService.createUser(req.body);
    res.status(201).json({ message: 'User added successfully.' });
});

const login = catchAsync(async (req, res) => {
    const token = await userService.login(req.body);
    res.status(200).json({ token });
});

const createOrUpdateUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    const {skipskipValidation, ...data} = req.body;
    const {created} =await userService.createOrUpdateUser(
        id,
        data,
        skipskipValidation
    );
    res.status(created ? 201 : 200).json({ message: 'User created or updated successfully' });
});

/// get user by email
const getUserByEmailController = catchAsync(async (req, res) => {
    const { email } = req.query;
    const user = await userService.getUserByEmail(email);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({user});
});
/// get user by id
const getUserByIdController = catchAsync(async (req, res) => {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
})

module.exports = { signup, login ,createOrUpdateUser,getUserByEmailController,getUserByIdController};