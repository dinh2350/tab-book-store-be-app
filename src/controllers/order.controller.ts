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
  request,
} from "inversify-express-utils";
import { ORDER_ENUM } from "../common/enums/order.enum";
import { GetQueryParams } from "../common/types/get-query-params.type";
import { parseIntUtil } from "../utils/parse-int.util";
import { authenticate } from "../middlewares/authenticate.middleware";
import { rolesGuard } from "../middlewares/authorize.middleware";
import { USER_ROLES } from "../common/enums/user.enum";
import { OrderService } from "../services/order.service";
import { Order } from "../models/order.model";

@controller("/Orders")
export class OrderController {
  constructor(private OrderService: OrderService) {}

  @httpGet("/")
  public async getAllOrders(
    @response() res: Response,
    @queryParam("page") page?: string,
    @queryParam("limit") limit?: string,
    @queryParam("sortBy") sortBy?: string,
    @queryParam("order") order?: ORDER_ENUM
  ): Promise<void> {
    const queryParam: GetQueryParams = {
      page: parseIntUtil(page),
      limit: parseIntUtil(limit),
      sortBy,
      order,
    };
    try {
      const Orders = await this.OrderService.getAllOrders(queryParam);
      res.json(Orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch Orders" });
    }
  }

  @httpGet("/:id")
  public async getOrderById(
    @requestParam("id") id: number,
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const order = await this.OrderService.getOrderById(id);
      if (order) {
        res.json(order);
      } else {
        res.status(404).json({ error: "Order not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch Order" });
    }
  }

  @httpPost("/", authenticate, rolesGuard([USER_ROLES.ADMIN]))
  public async createOrder(
    @requestBody() order: Order,
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const newOrder = await this.OrderService.createOrder(order);
      res.status(201).json(newOrder);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to create Order" });
    }
  }

  @httpPut("/:id", authenticate, rolesGuard([USER_ROLES.ADMIN]))
  public async updateOrder(
    @requestParam("id") id: number,
    @requestBody() order: Partial<Order>,
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const updatedOrder = await this.OrderService.updateOrder(id, order);
      if (updatedOrder) {
        res.json(updatedOrder);
      } else {
        res.status(404).json({ error: "Order not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update Order" });
    }
  }

  @httpDelete("/:id", authenticate, rolesGuard([USER_ROLES.ADMIN]))
  public async deleteOrder(
    @requestParam("id") id: number,
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      await this.OrderService.deleteOrder(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete Order" });
    }
  }
}
