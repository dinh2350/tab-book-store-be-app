import { injectable } from "inversify";
import { FindOptionsWhere, Repository } from "typeorm";
import { AppDataSource } from "../configs/data-source.config";
import { GetQueryParams } from "../common/types/get-query-params.type";
import { FindResponseType } from "../common/types/http.type";
import { Cart } from "../models/cart.model";
import { STATUS_ENUM } from "../common/enums/status.enum";
import { CreateCartDto } from "../dtos/cart.dto";

@injectable()
export class CartRepository {
  private repository: Repository<Cart>;

  constructor() {
    this.repository = AppDataSource.getRepository(Cart);
  }

  async findAll(queryParam: GetQueryParams): Promise<FindResponseType<Cart[]>> {
    const { page: page, limit, sortBy, order } = queryParam;

    const queryBuilder = this.repository.createQueryBuilder("cart");

    // Apply sorting
    if (order) {
      queryBuilder.orderBy(`cart.${sortBy}`, order);
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

  async findById(id: number): Promise<Cart | null> {
    return this.repository.findOneBy({ id });
  }

  async findByIdIncludeCartItem(userId: number, id?: number) {
    const queryBuilder = this.repository
      .createQueryBuilder("cart")
      .leftJoinAndSelect("cart.cartItems", "cartItem") // Join with cartItems
      .leftJoinAndSelect("cartItem.book", "book");

    if (id) {
      queryBuilder.andWhere("cart.id = :id", { id });
    }
    return queryBuilder
      .andWhere("cart.createdBy = :userId", { userId })
      .andWhere("cart.status = :status", { status: STATUS_ENUM.ACTIVE })
      .getOne();
  }

  async findActiveByUser(createdBy: number) {
    return this.repository.findOneBy({
      createdBy,
      status: STATUS_ENUM.ACTIVE,
    });
  }

  async create(cart: CreateCartDto): Promise<Cart> {
    return this.repository.save(this.repository.create(cart));
  }

  async update(id: number, cart: Partial<Cart>): Promise<Cart | null> {
    await this.repository.update(id, cart);
    return this.repository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
