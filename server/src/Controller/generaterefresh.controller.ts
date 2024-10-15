import { Request, Response } from "express";
import { verifyToken } from '../util/verifytoken';
import user from '../Model/user';
import { generateTokenAndSetCookie } from '../util/genarateTokenAndSetCookie';
export const generateAccessthroughRefresh = async (req: Request, res: Response) => {

  const oldrefreshToken = req.cookies.refreshToken;
  console.log("old refreshtoken", oldrefreshToken);

  if (!oldrefreshToken) {
    res.status(401).json({
      Success: false,
      message: "UnAuthorised user"
    })
  }

  const payload = await verifyToken(oldrefreshToken);

  const newuser = await user.findById({ _id: payload._id })

  if (!newuser) {
    res.status(401).json({
      success: true,
      message: "UnAuthorised user"
    })
  }

  const newPayload = {
    _id: newuser._id
  }
  const { token, refreshToken } = generateTokenAndSetCookie(newPayload)

  res.status(200).cookie("token", token,
    {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000
    }).json({
      Success: true,
      refreshToken: refreshToken,
      message: "login Succesfull"

    })

}