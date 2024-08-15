import { inject, injectable } from "inversify";
import { BookRepository } from "../repositories/book.repository";
import { Book } from "../models/book.model";

@injectable()
export class BookService {
  constructor(@inject(BookRepository) private bookRepository: BookRepository) {}

  async getAllBooks(): Promise<Book[]> {
    return this.bookRepository.findAll();
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
