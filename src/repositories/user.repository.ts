import { injectable } from "inversify";
import { Repository } from "typeorm";
import { User } from "../models/user.model";
import { AppDataSource } from "../configs/data-source.config";
import { GetQueryParams } from "../common/types/get-query-params.type";
import { FindResponseType } from "../common/types/http.type";

@injectable()
export class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async findAll(queryParam: GetQueryParams): Promise<FindResponseType<User[]>> {
    const { page, limit, sortBy, order } = queryParam;

    const queryBuilder = this.repository.createQueryBuilder("user");

    // Apply sorting
    if (sortBy) {
      queryBuilder.orderBy(`user.${sortBy}`, order || "ASC"); // Default to 'ASC' if no order is provided
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

  async findById(id: number): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email });
  }

  async create(user: User): Promise<User> {
    return this.repository.save(this.repository.create(user));
  }

  async update(id: number, user: Partial<User>): Promise<User | null> {
    await this.repository.update(id, user);
    return this.repository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
