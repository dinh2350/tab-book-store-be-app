import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { AuthenticatedRequest } from "../common/enums/auth.type";
import { JWT_SECRET } from "../environment/variable.env";

export function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as User; // Verify token and get user data
    req["user"] = decoded; // Attach the user data to the request object
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
}
