import { Response, Request ,NextFunction } from "express";
import user from '../Model/user';
import { verifyToken } from './verifytoken';

export const isLoggedin = async (req:Request, res:Response, next :NextFunction) => {
  try {
    const token = req.cookies.token;
    console.log("Token...",token)
    if (!token) {
      return  res.status(401).json({
        success: false,
        message: "Unauthorized, please log in"
      });
    }

    const payload = await verifyToken(token);
    console.log(payload)
    const newUser = await user.findById({_id : payload._id});
    console.log("user",newUser)
    if (!newUser) {
     return res.status(401).json({
        success: false,
        message: "Unauthorized, please log in"
      });
    }
    // req.body.user = newUser;
    next();
  } catch (error) {
   return res.status(401).json({
      success: false,
      message: "Unauthorized, please log in"
    });
  }
}



