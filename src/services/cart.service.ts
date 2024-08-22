import { CartItem } from "./../models/cart-item.model";
import { inject, injectable } from "inversify";
import { GetQueryParams } from "../common/types/get-query-params.type";
import { FindResponseType } from "../common/types/http.type";
import { CartRepository } from "../repositories/cart.repository";
import { Cart } from "../models/cart.model";
import { BookService } from "./book.service";
import { AddBookToCartDto, CreateCartDto } from "../dtos/cart.dto";
import { CartItemService } from "./cart-item.service";
import { createCartItemDto } from "../dtos/cart-item.dto";

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

  async findByIdIncludeCartItem(id?: number) {
    return this.cartRepository.findByIdIncludeCartItem(id);
  }

  async createCart(cart: CreateCartDto): Promise<Cart> {
    return this.cartRepository.create(cart);
  }

  async addBookToCart({
    createdBy,
    bookId,
    quantity,
  }: AddBookToCartDto): Promise<Cart> {
    // check book is exist
    const book = await this.bookService.getBookById(bookId);
    if (!book) throw new Error("Book not found");
    // check cart is exist by userId, create cart if not exist
    if (!createdBy) throw new Error("User invalid");
    const cart = await this.cartRepository.findActiveByUser(createdBy);
    let newCart: Cart | null = null;
    if (!cart) {
      newCart = await this.cartRepository.create({ createdBy });
    } else {
      newCart = cart;
    }
    // create the cart item, if cart item is exist will be += selected quantity
    const cartItem = await this.cartItemService.getCarItemByCartAndBook(
      newCart.id,
      bookId
    );
    if (!cartItem) {
      await this.cartItemService.createCartItem({
        bookId,
        cartId: newCart.id,
        quantity,
      });
    } else {
      cartItem.quantity += quantity;
      await this.cartItemService.updateCartItem(cartItem.id, cartItem);
    }
    return newCart;
  }

  async updateCart(id: number, cart: Partial<Cart>): Promise<Cart | null> {
    return this.cartRepository.update(id, cart);
  }

  async deleteCart(id: number): Promise<void> {
    return this.cartRepository.delete(id);
  }
}
