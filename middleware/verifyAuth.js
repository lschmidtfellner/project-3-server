import jwt from "jsonwebtoken";
// import { token } from "morgan";
// import cookieParser from 'cookie-parser';

const SECRET_KEY = process.env.SECRET_KEY

const verifyAuth = async (req, res, next) => {
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
console.log('verifyAuth')
  
  try {
     token = req.headers.authorization.split(' ')[1];
   
    if (!token) {
      return res.status(401).json({message: "No authentication token, authorization denied."});
    }

    const verified = jwt.verify(token, SECRET_KEY);
    if (!verified) {
      return res.status(401).json({message: "Token verification failed, authorization denied."});
    }

    req.user = verified.id; // Add this line to add user id to the request

    next();
  } catch (err) {
    res.status(500).json({error: err.message});
  } }
};

export default verifyAuth;
