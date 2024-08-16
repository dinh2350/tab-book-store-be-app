import { Container } from "inversify";
import { BookController } from "../controllers/book.controller";
import { BookRepository } from "../repositories/book.repository";
import { BookService } from "../services/book.service";
import { UserService } from "../services/user.service";
import { UserRepository } from "../repositories/user.repository";
import { UserController } from "../controllers/user.controller";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";

const container = new Container();

container.bind(BookService).toSelf();
container.bind(BookRepository).toSelf();
container.bind(BookController).toSelf();

container.bind(UserService).toSelf();
container.bind(UserRepository).toSelf();
container.bind(UserController).toSelf();

container.bind(AuthController).toSelf();
container.bind(AuthService).toSelf();

export { container };
