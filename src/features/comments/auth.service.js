const authRepository = require("./comment.model");
const hashPassword = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (email,name,password) => {
 /// 1. check if email is already registered
    const userExist = await authRepository.findUserByEmail(email); /// undefined or {}
    //2. if yes return error
    if(userExist) throw new Error("Email already exist");
    //3. hash password
    const hashedPassword = await hashPassword.hash(password,10);
    //4. create users in db
    const user = await authRepository.createUser(email,name,hashedPassword);
    if(!user) throw new Error("Failed to create users");
    return user;
    // 5. return users


}
/// login
const login = async (email,password) => {
    const userExist = await authRepository.findUserByEmail(email); /// undefined or {}
    if(!userExist) throw new Error("User not found");
    /// compare password/
    const isMatch = await hashPassword.compare(password,userExist.password);
    if(!isMatch) throw new Error("Invalid password");
    /// create token
    const token = jwt.sign({id:userExist.id,name:userExist.name},process.env.JWT_SECRET,{expiresIn:"1h"});
    /// return token
    return token;


}

module.exports = {register,login}