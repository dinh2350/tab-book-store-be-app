import { injectable } from "inversify";
import { Repository } from "typeorm";
import { AppDataSource } from "../configs/data-source.config";
import { GetQueryParams } from "../common/types/get-query-params.type";
import { FindResponseType } from "../common/types/http.type";
import { CartItem } from "../models/cart-item.model";
import { createCartItemDto } from "../dtos/cart-item.dto";

@injectable()
export class CartItemRepository {
  private repository: Repository<CartItem>;

  constructor() {
    this.repository = AppDataSource.getRepository(CartItem);
  }

  async findAll(
    queryParam: GetQueryParams
  ): Promise<FindResponseType<CartItem[]>> {
    const { page: page, limit, sortBy, order } = queryParam;

    const queryBuilder = this.repository.createQueryBuilder("cart_item");

    // Apply sorting
    if (order) {
      queryBuilder.orderBy(`cartItem.${sortBy}`, order);
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

  async findById(id: number): Promise<CartItem | null> {
    return this.repository.findOneBy({ id });
  }

  async findByCartAndBook(
    cartId: number,
    bookId: number
  ): Promise<CartItem | null> {
    return this.repository.findOneBy({ cartId, bookId });
  }

  async create(cartItem: createCartItemDto): Promise<CartItem> {
    return this.repository.save(this.repository.create(cartItem));
  }

  async update(
    id: number,
    cartItem: Partial<CartItem>
  ): Promise<CartItem | null> {
    await this.repository.update(id, cartItem);
    return this.repository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
