import { Container } from "inversify";
import { BookController } from "../controllers/book.controller";
import { BookRepository } from "../repositories/book.repository";
import { BookService } from "../services/book.service";

const container = new Container();
container.bind(BookService).toSelf();
container.bind(BookRepository).toSelf();
container.bind(BookController).toSelf();

export { container };
