import { Response, Request } from "express";
import {
  controller,
  httpGet,
  httpPost,
  queryParam,
  requestBody,
  response,
} from "inversify-express-utils";
import { authenticate } from "../middlewares/authenticate.middleware";
import { CartService } from "../services/cart.service";
import { AddBookToCartDto } from "../dtos/cart.dto";
import { attachUserId } from "../middlewares/attach-user-id.middleware";
import { parseIntUtil } from "../utils/parse-int.util";

@controller("/carts")
export class CartController {
  constructor(private cartService: CartService) {}

  @httpGet("/detail")
  public async getCartById(
    @response() res: Response,
    @queryParam("id") id?: string
  ): Promise<void> {
    try {
      const cartId = parseIntUtil(id);
      const cart = await this.cartService.findByIdIncludeCartItem(cartId);
      if (cart) {
        res.json(cart);
      } else {
        res.status(404).json({ error: "cart not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cart" });
    }
  }

  @httpPost("/add-book", authenticate, attachUserId)
  public async addBookToCart(
    @requestBody() body: AddBookToCartDto,
    // @UserId() userId: number,
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const cart = await this.cartService.addBookToCart(body);
      res.status(201).json(cart);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to add book to cart" });
    }
  }
}
