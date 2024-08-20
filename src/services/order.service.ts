import { inject, injectable } from "inversify";
import { GetQueryParams } from "../common/types/get-query-params.type";
import { FindResponseType } from "../common/types/http.type";
import { OrderRepository } from "../repositories/order.repository";
import { Order } from "../models/order.model";
import { CartService } from "./cart.service";
import { CheckoutCartDto, CreateOrderDto } from "../dtos/order.dto";
import { BookService } from "./book.service";
import { Book } from "../models/book.model";
import { STATUS_ENUM } from "../common/enums/status.enum";

@injectable()
export class OrderService {
  constructor(
    @inject(OrderRepository) private OrderRepository: OrderRepository,
    private cartService: CartService,
    private bookService: BookService
  ) {}

  async getAllOrders(
    queryParam: GetQueryParams
  ): Promise<FindResponseType<Order[]>> {
    return this.OrderRepository.findAll(queryParam);
  }

  async getOrderById(id: number): Promise<Order | null> {
    return this.OrderRepository.findById(id);
  }

  async createOrder(order: CreateOrderDto): Promise<Order> {
    return this.OrderRepository.create(order);
  }

  async checkout({ cartId, createdBy }: CheckoutCartDto) {
    // find cart and check is exist -> cart-item ( bookId , quantity )
    const cart = await this.cartService.findByIdIncludeCartItem(cartId);
    if (!cart) throw new Error("Cart not found");
    if (cart.cartItems && cart.cartItems.length <= 0)
      throw new Error("Cart item is not empty");
    // update quantity of books
    const cartItemQuantity = await Promise.all(
      cart.cartItems?.map(async (item) => {
        const itemQuantity = item.quantity;
        const book = await this.bookService.getBookById(item.bookId);
        const bookQuantity = book?.quantity as number;
        if (bookQuantity < itemQuantity)
          throw new Error("inventory not enough");
        return this.bookService.updateBook(book?.id as number, {
          quantity: bookQuantity - itemQuantity,
        });
      }) as Array<Promise<Book>>
    );
    // create order ( cartId and createdBy )

    const order = await this.OrderRepository.create({
      cartId: cart.id,
      createdBy,
    });

    // update status of cart
    await this.cartService.updateCart(cart.id, {
      status: STATUS_ENUM.DONE,
    });
    // update staus of order
    return cart;
  }

  async updateOrder(id: number, order: Partial<Order>): Promise<Order | null> {
    return this.OrderRepository.update(id, order);
  }

  async deleteOrder(id: number): Promise<void> {
    return this.OrderRepository.delete(id);
  }
}
