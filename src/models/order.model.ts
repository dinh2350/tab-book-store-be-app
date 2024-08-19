import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { User } from "./user.model";
import { BaseModel } from "./base.model";
import { Cart } from "./cart.model";

@Entity({ name: "orders" })
export class Order extends BaseModel {
  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: "created_by" })
  user!: User;

  @Column({ name: "cart_id" })
  cartId!: number;

  @OneToOne(() => Cart, (cart) => cart.order)
  @JoinColumn({ name: "cart_id" })
  cart!: Cart;
}
