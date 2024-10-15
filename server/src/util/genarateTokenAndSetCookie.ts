const jwt = require('jsonwebtoken');
import { log } from 'console';
import { Response } from 'express';
const dotenv = require('dotenv');

dotenv.config();

interface Payload {
  [key: string]: any;
}

export const generateTokenAndSetCookie = (payload: Payload): any => {
  const secret = process.env.JWT_SECRET;
  console.log("Payload....", payload);

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }


  const token = jwt.sign(payload, secret, {
    expiresIn: "2h",
  });
  const refreshToken = jwt.sign(payload,secret,{
    expiresIn : "7d"
  })

  console.log("token ", token)
  console.log("refreshToken ", token);
  

  return {token , refreshToken}
  
};
