import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseModel } from "./base.model";
import { Cart } from "./cart.model";
import { Book } from "./book.model";

@Entity({ name: "cart_items" })
export class CartItem extends BaseModel {
  @Column({ name: "cart_id" })
  cartId!: number;

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  @JoinColumn({ name: "cart_id" })
  cart!: Cart;

  @Column({ name: "book_id" })
  bookId!: number;

  @ManyToOne(() => Book, (book) => book.cartItems)
  @JoinColumn({ name: "book_id" })
  book!: Book;

  @Column()
  quantity!: number;
}
