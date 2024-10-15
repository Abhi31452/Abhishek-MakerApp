const jwt = require ("jsonwebtoken");

export const verifyToken = async (token :any )=>{
return jwt.verify(token,"mysecretkey" );
}