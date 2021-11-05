import jwt from "jsonwebtoken";
import { promisify } from "es6-promisify";

const verify = promisify(jwt.verify);

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.token;

  if (!authHeader) {
    return res.status(403).json({
      message: "No token provided",
    });
  }

  try {
    const user = await verify(authHeader, process.env.PRIVATE_KEY);
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
