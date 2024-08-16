import { Entity, Column } from "typeorm";
import { BaseModel } from "./base.model";
import { USER_ROLES } from "../common/enums/user.enum";

@Entity({ name: "users" })
export class User extends BaseModel {
  @Column({ length: 50, unique: true })
  username!: string;

  @Column({ length: 100, unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({
    type: "enum",
    enum: [USER_ROLES.ADMIN, USER_ROLES.USER],
    default: USER_ROLES.USER,
  })
  role!: USER_ROLES;
}
