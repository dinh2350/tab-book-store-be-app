import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../common/enums/auth.type";

export function attachUserId(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  if (req.user && req.user.id) {
    req.body.userId = req.user.id;
  }
  next();
}
