import { inject, injectable } from "inversify";
import { GetQueryParams } from "../common/types/get-query-params.type";
import { FindResponseType } from "../common/types/http.type";
import { CartRepository } from "../repositories/cart.repository";
import { Cart } from "../models/cart.model";
import { BookService } from "./book.service";
import { CreateCartDto } from "../dtos/cart.dto";
import { CartItemService } from "./cart-item.service";

@injectable()
export class CartService {
  constructor(
    @inject(CartRepository) private cartRepository: CartRepository,
    private bookService: BookService,
    private cartItemService: CartItemService
  ) {}

  async getAllCarts(
    queryParam: GetQueryParams
  ): Promise<FindResponseType<Cart[]>> {
    return this.cartRepository.findAll(queryParam);
  }

  async getCartById(id: number): Promise<Cart | null> {
    return this.cartRepository.findById(id);
  }

  async createCart(cart: CreateCartDto): Promise<Cart> {
    return this.cartRepository.create(cart);
  }

  async addBookToCart(userId: number, bookId: number) {
    // check book is exist
    const book = await this.bookService.getBookById(bookId);
    if (!book) throw new Error("Book not found");
    // check cart is exist by userId, create cart if not exist
    const cart = await this.cartRepository.findActiveByUser(userId);
    let newCart: Cart | null = null;
    if (!cart) {
      newCart = await this.cartRepository.create({ created_by: userId });
    } else {
      newCart = cart;
    }
    const cartItem = await this.cartItemService.getCarItemByCartAndBook(
      newCart.id,
      bookId
    );
    if(!cartItem) 
    // create the cart item, if cart item is exist will be += selected quantity
  }

  async updateCart(id: number, cart: Partial<Cart>): Promise<Cart | null> {
    return this.cartRepository.update(id, cart);
  }

  async deleteCart(id: number): Promise<void> {
    return this.cartRepository.delete(id);
  }
}
