import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { BaseModel } from "./base.model";
import { User } from "./user.model";
import { CartItem } from "./cart-item.model";
import { Order } from "./order.model";

@Entity({ name: "carts" })
export class Cart extends BaseModel {
  @ManyToOne(() => User, (user) => user.carts)
  @JoinColumn({ name: "created_by" })
  user?: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  cartItems?: CartItem[];

  @OneToOne(() => Order, (order) => order.cart)
  order?: Order;
}
