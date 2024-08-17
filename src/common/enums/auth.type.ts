import { Request } from "express";
import { User } from "../../models/user.model";

export interface AuthenticatedRequest extends Request {
  user?: User;
}
