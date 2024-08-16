import { Request, Response } from "express";
import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  httpDelete,
  requestParam,
  requestBody,
  queryParam,
  response,
} from "inversify-express-utils";
import { UserService } from "../services/user.service";
import { User } from "../models/user.model";
import { GetQueryParams } from "../common/types/get-query-params.type";
import { parseIntUtil } from "../utils/parse-int.util";

@controller("/users")
export class UserController {
  constructor(private userService: UserService) {}

  @httpGet("/")
  public async getAllUsers(
    @response() res: Response,
    @queryParam("page") page?: string,
    @queryParam("limit") limit?: string,
    @queryParam("sortBy") sortBy?: string,
    @queryParam("order") order?: string // Adjust type if you have specific order enums
  ): Promise<void> {
    const queryParam: GetQueryParams = {
      page: parseIntUtil(page),
      limit: parseIntUtil(limit),
      sortBy,
      order: order as any, // Convert to specific enum type if needed
    };
    try {
      const users = await this.userService.getAllUsers(queryParam);
      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  }

  @httpGet("/:id")
  public async getUserById(
    @requestParam("id") id: number,
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const user = await this.userService.getUserById(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  }

  @httpPost("/")
  public async createUser(
    @requestBody() user: User,
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const newUser = await this.userService.createUser(user);
      res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to create user" });
    }
  }

  @httpPut("/:id")
  public async updateUser(
    @requestParam("id") id: number,
    @requestBody() user: Partial<User>,
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const updatedUser = await this.userService.updateUser(id, user);
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  }

  @httpDelete("/:id")
  public async deleteUser(
    @requestParam("id") id: number,
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      await this.userService.deleteUser(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete user" });
    }
  }
}
