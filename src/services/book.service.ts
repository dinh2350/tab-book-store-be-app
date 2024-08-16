import { inject, injectable } from "inversify";
import { BookRepository } from "../repositories/book.repository";
import { Book } from "../models/book.model";
import { GetQueryParams } from "../common/types/get-query-params.type";
import { FindResponseType } from "../common/types/http.type";

@injectable()
export class BookService {
  constructor(@inject(BookRepository) private bookRepository: BookRepository) {}

  async getAllBooks(
    queryParam: GetQueryParams
  ): Promise<FindResponseType<Book[]>> {
    return this.bookRepository.findAll(queryParam);
  }

  async getBookById(id: number): Promise<Book | null> {
    return this.bookRepository.findById(id);
  }

  async createBook(book: Book): Promise<Book> {
    return this.bookRepository.create(book);
  }

  async updateBook(id: number, book: Partial<Book>): Promise<Book | null> {
    return this.bookRepository.update(id, book);
  }

  async deleteBook(id: number): Promise<void> {
    return this.bookRepository.delete(id);
  }
}
