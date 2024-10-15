import { Request, Response } from "express";


 export const logout = async(req: Request, res: Response) => {

  console.log("logout function called")

  return res.status(200).cookie("token", "", {
    httpOnly: true,
     sameSite: "Strict",
    maxAge: 0,
  }).json({ "Logout Successfully ": String });
}