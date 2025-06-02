import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) throw new Error("auth token missing");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id, {
      attributes: ["id", "name", "email", "role"],
    });
    if (!user) throw new Error("user not found");
    req.user = user;
    next();
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};
