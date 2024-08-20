import { injectable } from "inversify";
import { Repository } from "typeorm";
import { Order } from "../models/order.model";
import { AppDataSource } from "../configs/data-source.config";
import { GetQueryParams } from "../common/types/get-query-params.type";
import { FindResponseType } from "../common/types/http.type";
import { CreateOrderDto } from "../dtos/order.dto";

@injectable()
export class OrderRepository {
  private repository: Repository<Order>;

  constructor() {
    this.repository = AppDataSource.getRepository(Order);
  }

  async findAll(
    queryParam: GetQueryParams
  ): Promise<FindResponseType<Order[]>> {
    const { page: page, limit, sortBy, order } = queryParam;

    const queryBuilder = this.repository.createQueryBuilder("order");

    // Apply sorting
    if (order) {
      queryBuilder.orderBy(`order.${sortBy}`, order);
    }

    // Apply pagination
    if (page && limit) {
      queryBuilder.skip((page - 1) * limit).take(limit);
    }

    // Execute the query and get the total count
    const [data, total] = await queryBuilder.getManyAndCount();

    // Calculate total pages
    let totalPages = 1;
    if (limit) {
      totalPages = Math.ceil(total / limit);
    }

    return { data, total, page, totalPages };
  }

  async findById(id: number): Promise<Order | null> {
    return this.repository.findOneBy({ id });
  }

  async create(order: CreateOrderDto): Promise<Order> {
    console.log(order);
    return this.repository.save(this.repository.create(order));
  }

  async update(id: number, order: Partial<Order>): Promise<Order | null> {
    await this.repository.update(id, order);
    return this.repository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
