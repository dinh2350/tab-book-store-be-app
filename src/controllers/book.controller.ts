import { Request, Response } from "express";
import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  httpDelete,
  requestParam,
  requestBody,
} from "inversify-express-utils";
import { BookService } from "../services/book.service";
import { Book } from "../models/book.model";

@controller("/books")
export class BookController {
  constructor(private bookService: BookService) {}

  @httpGet("/")
  public async getAllBooks(req: Request, res: Response): Promise<void> {
    try {
      const books = await this.bookService.getAllBooks();
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch books" });
    }
  }

  @httpGet("/:id")
  public async getBookById(
    @requestParam("id") id: number,
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const book = await this.bookService.getBookById(id);
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ error: "Book not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch book" });
    }
  }

  @httpPost("/")
  public async createBook(
    @requestBody() book: Book,
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const newBook = await this.bookService.createBook(book);
      res.status(201).json(newBook);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to create book" });
    }
  }

  @httpPut("/:id")
  public async updateBook(
    @requestParam("id") id: number,
    @requestBody() book: Partial<Book>,
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const updatedBook = await this.bookService.updateBook(id, book);
      if (updatedBook) {
        res.json(updatedBook);
      } else {
        res.status(404).json({ error: "Book not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update book" });
    }
  }

  @httpDelete("/:id")
  public async deleteBook(
    @requestParam("id") id: number,
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      await this.bookService.deleteBook(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete book" });
    }
  }
}
