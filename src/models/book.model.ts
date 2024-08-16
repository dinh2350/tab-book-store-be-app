import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BOOK_CATEGORIES } from "../common/enums/book.enum";
import { BaseModel } from "./base.model";

@Entity({ name: "books" })
export class Book extends BaseModel {
  @Column({ length: 30 })
  title!: string;

  @Column({ nullable: true })
  image!: string;

  @Column({
    type: "enum",
    enum: [
      BOOK_CATEGORIES.DRAMA,
      BOOK_CATEGORIES.COMEDY,
      BOOK_CATEGORIES.SPORT,
    ],
  })
  category!: BOOK_CATEGORIES;

  @Column({ type: "int" })
  quantity!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price!: number;

  @Column({ type: "text", nullable: true })
  description!: string;
}
