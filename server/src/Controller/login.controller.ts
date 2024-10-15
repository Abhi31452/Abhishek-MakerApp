import { Request, Response } from "express";
import user, { Iuser } from "../Model/user";
import { generateTokenAndSetCookie } from '../util/genarateTokenAndSetCookie';
import { json } from 'stream/consumers';
const bcryptjs = require('bcryptjs')

export const login = async (req: Request, res: Response): Promise<Response> => {

  // console.log(req.body);
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      throw new Error("All fields Required")
    }

    const User: Iuser | null = await user.findOne({ username });
    if (!User) {
      return res.status(401).json({ Success: false, message: "Invalid Credentials" })
    }

    // console.log("password", password, User.password);
    const hashPassword = await bcryptjs.compare(password, User.password);
    console.log("hasshPassword", hashPassword)
    if (!hashPassword) {
      return res.status(401).json({ Success: false, message: "Invalid password" })
    }
    const userResponse = {
      username,
      password: undefined
    }

    const { token, refreshToken } = generateTokenAndSetCookie({ _id: User._id });

    await user.updateOne(
      { _id: User._id },
      { $set: { refrenceToken: refreshToken } })

    return res.status(200)
      .cookie("token", token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 })
      .cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
      .json({
        message: "logged in success"
      });

  } catch (err) {
    console.log(err);
  return  res.status(400).json({
      Success: false,
      message: err.message
    })
  }


}
