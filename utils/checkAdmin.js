import jwt from "jsonwebtoken";

export const checkAdmin = (req) => {
  const authHeader = req.headers.token;
  if (req.body.password === process.env.PRIVATE_KEY) {
    return true;
  }
  if (!authHeader) {
    return false;
  }

  try {
    jwt.verify(authHeader, process.env.PRIVATE_KEY);
    return req.body.isAdmin;
  } catch (error) {
    return false;
  }
};
