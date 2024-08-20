import { Container } from "inversify";
import { BookController } from "../controllers/book.controller";
import { BookRepository } from "../repositories/book.repository";
import { BookService } from "../services/book.service";
import { UserService } from "../services/user.service";
import { UserRepository } from "../repositories/user.repository";
import { UserController } from "../controllers/user.controller";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { CartService } from "../services/cart.service";
import { CartRepository } from "../repositories/cart.repository";
import { CartController } from "../controllers/cart.controller";
import { CartItemRepository } from "../repositories/cart-item.repository";
import { CartItemService } from "../services/cart-item.service";
import { CartItemController } from "../controllers/cart-item.controller";
import { OrderService } from "../services/order.service";
import { OrderController } from "../controllers/order.controller";
import { OrderRepository } from "../repositories/order.repository";

const container = new Container();

container.bind(BookService).toSelf();
container.bind(BookRepository).toSelf();
container.bind(BookController).toSelf();

container.bind(UserService).toSelf();
container.bind(UserRepository).toSelf();
container.bind(UserController).toSelf();

container.bind(AuthController).toSelf();
container.bind(AuthService).toSelf();

container.bind(CartItemController).toSelf();
container.bind(CartItemRepository).toSelf();
container.bind(CartItemService).toSelf();

container.bind(CartService).toSelf();
container.bind(CartRepository).toSelf();
container.bind(CartController).toSelf();

container.bind(OrderService).toSelf();
container.bind(OrderRepository).toSelf();
container.bind(OrderController).toSelf();

export { container };
