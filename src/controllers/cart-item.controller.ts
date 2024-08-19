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
import { CartItemService } from "../services/cart-item.service";
import { createCartItemDto } from "../dtos/cart-item.dto";

@controller("/cart-items")
export class CartItemController {
  constructor(private cartItemService: CartItemService) {}

  @httpGet("/")
  public async getAllCartItems(
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
      const cartItems = await this.cartItemService.getAllCartItems(queryParam);
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cartItems" });
    }
  }

  @httpGet("/:id")
  public async getCartitemById(
    @requestParam("id") id: number,
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const cartitem = await this.cartItemService.getCartItemById(id);
      if (cartitem) {
        res.json(cartitem);
      } else {
        res.status(404).json({ error: "Cartitem not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cartitem" });
    }
  }

  @httpPost("/", authenticate)
  public async createCartItem(
    @requestBody() cartItem: createCartItemDto,
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const newCartItem = await this.cartItemService.createCartItem(cartItem);
      res.status(201).json(newCartItem);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to create CartItem" });
    }
  }

  @httpPut("/:id", authenticate)
  public async updateCartItem(
    @requestParam("id") id: number,
    @requestBody() cartItem: Partial<createCartItemDto>,
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const updatedCartItem = await this.cartItemService.updateCartItem(
        id,
        cartItem
      );
      if (updatedCartItem) {
        res.json(updatedCartItem);
      } else {
        res.status(404).json({ error: "CartItem not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update CartItem" });
    }
  }

  @httpDelete("/:id", authenticate)
  public async deleteCartItem(
    @requestParam("id") id: number,
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      await this.cartItemService.deleteCartItem(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete CartItem" });
    }
  }
}
