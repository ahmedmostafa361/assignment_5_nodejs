 const authService = require("./auth.service");
const registerController = async (req, res,next) => {
    try {
        /// handle request service
        const{email,name,password}=req.body;
        const createdUser = await authService.register(email,name,password);
        /// handle send response
        res.status(201).json({message:"User created successfully",
            success : true,
            user:createdUser});

    }catch (error) {
        next(error);
    }


 }
 const loginController = async (req, res,next) => {
    const{email,password}=req.body;
    try {
        const token = await authService.login(email,password);
        res.status(200).json({message:"User logged in successfully",
            success : true,
            data : token
        });

    }catch (error) {
        next(error);
    }

 }
 const logoutController = (req, res,next) => {}
 const sendOTPController = (req, res,next) => {}
 const verifyOTPController = (req, res,next) => {}
 const resetPasswordController = (req, res, next) => {

 }
 module.exports = {registerController, loginController, logoutController, sendOTPController, verifyOTPController, resetPasswordController: resetPasswordController}