import { Request, Response, NextFunction } from "express";
import { USER_ROLES } from "../common/enums/user.enum";
import { AuthenticatedRequest } from "../common/enums/auth.type";

export function rolesGuard(allowedRoles: USER_ROLES[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req?.user; // assuming the user is attached to the request object
    if (user && allowedRoles.includes(user.role)) {
      return next(); // User has one of the allowed roles
    }
    return res.status(403).json({ message: "Forbidden" });
  };
}
