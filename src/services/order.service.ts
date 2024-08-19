import { inject, injectable } from "inversify";
import { GetQueryParams } from "../common/types/get-query-params.type";
import { FindResponseType } from "../common/types/http.type";
import { OrderRepository } from "../repositories/order.repository";
import { Order } from "../models/order.model";

@injectable()
export class OrderService {
  constructor(
    @inject(OrderRepository) private OrderRepository: OrderRepository
  ) {}

  async getAllOrders(
    queryParam: GetQueryParams
  ): Promise<FindResponseType<Order[]>> {
    return this.OrderRepository.findAll(queryParam);
  }

  async getOrderById(id: number): Promise<Order | null> {
    return this.OrderRepository.findById(id);
  }

  async createOrder(order: Order): Promise<Order> {
    return this.OrderRepository.create(order);
  }

  async updateOrder(id: number, order: Partial<Order>): Promise<Order | null> {
    return this.OrderRepository.update(id, order);
  }

  async deleteOrder(id: number): Promise<void> {
    return this.OrderRepository.delete(id);
  }
}
