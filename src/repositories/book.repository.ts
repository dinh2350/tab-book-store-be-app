import { injectable } from "inversify";
import { Repository } from "typeorm";
import { Book } from "../models/book.model";
import { AppDataSource } from "../configs/data-source.config";

@injectable()
export class BookRepository {
  private repository: Repository<Book>;

  constructor() {
    this.repository = AppDataSource.getRepository(Book);
  }

  async findAll(): Promise<Book[]> {
    return this.repository.find();
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
