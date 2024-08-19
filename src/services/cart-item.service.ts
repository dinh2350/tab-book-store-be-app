import { inject, injectable } from "inversify";
import { GetQueryParams } from "../common/types/get-query-params.type";
import { FindResponseType } from "../common/types/http.type";
import { CartItemRepository } from "../repositories/cart-item.repository";
import { CartItem } from "../models/cart-item.model";
import { createCartItemDto } from "../dtos/cart-item.dto";

@injectable()
export class CartItemService {
  constructor(
    @inject(CartItemRepository) private cartItemRepository: CartItemRepository
  ) {}

  async getAllCartItems(
    queryParam: GetQueryParams
  ): Promise<FindResponseType<CartItem[]>> {
    return this.cartItemRepository.findAll(queryParam);
  }

  async getCartItemById(id: number): Promise<CartItem | null> {
    return this.cartItemRepository.findById(id);
  }

  async getCarItemByCartAndBook(cartId: number, bookId: number) {
    return this.cartItemRepository.findByCartAndBook(cartId, bookId);
  }

  async createCartItem(cartItem: createCartItemDto): Promise<CartItem> {
    return this.cartItemRepository.create(cartItem);
  }

  async updateCartItem(
    id: number,
    cartItem: Partial<CartItem>
  ): Promise<CartItem | null> {
    return this.cartItemRepository.update(id, cartItem);
  }

  async deleteCartItem(id: number): Promise<void> {
    return this.cartItemRepository.delete(id);
  }
}
