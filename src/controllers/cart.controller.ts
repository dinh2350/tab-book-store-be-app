import { Response, Request } from "express";
import { controller, httpPost, requestBody } from "inversify-express-utils";
import { authenticate } from "../middlewares/authenticate.middleware";
import { CartService } from "../services/cart.service";
import { AddBookToCartDto } from "../dtos/cart.dto";
import { attachUserId } from "../middlewares/attach-user-id.middleware";

@controller("/carts")
export class CartController {
  constructor(private cartService: CartService) {}

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
