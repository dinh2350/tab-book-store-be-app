import { injectable } from "inversify";
import { Repository } from "typeorm";
import { Book } from "../models/book.model";
import { AppDataSource } from "../configs/data-source.config";
import { GetQueryParams } from "../common/types/get-query-params.type";
import { FindResponseType } from "../common/types/http.type";

@injectable()
export class BookRepository {
  private repository: Repository<Book>;

  constructor() {
    this.repository = AppDataSource.getRepository(Book);
  }

  async findAll(queryParam: GetQueryParams): Promise<FindResponseType<Book[]>> {
    const { page: page, limit, sortBy, order } = queryParam;

    const queryBuilder = this.repository.createQueryBuilder("book");

    // Apply sorting
    if (order) {
      queryBuilder.orderBy(`book.${sortBy}`, order);
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

  async findById(id: number): Promise<Book | null> {
    return this.repository.findOneBy({ id });
  }

  async create(book: Book): Promise<Book> {
    return this.repository.save(this.repository.create(book));
  }

  async update(id: number, book: Partial<Book>): Promise<Book | null> {
    await this.repository.update(id, book);
    return this.repository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
