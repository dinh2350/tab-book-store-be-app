import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { STATUS_ENUM } from "../common/enums/status.enum";

export abstract class BaseModel {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column()
  @CreateDateColumn({
    name: "created_date",
    type: "timestamp",
    default: "now()",
  })
  createdDate?: Date;

  @Column()
  @UpdateDateColumn({
    name: "last_modified_date",
    type: "timestamp",
    default: "now()",
  })
  lastModifiedDate?: Date;

  @Column({
    name: "created_by",
    nullable: true,
  })
  createdBy?: number;

  @Column({
    name: "last_modified_by",
    nullable: true,
  })
  lastModifiedBy?: number;

  @Column({
    type: "enum",
    enum: [
      STATUS_ENUM.ACTIVE,
      STATUS_ENUM.INACTIVE,
      STATUS_ENUM.DONE,
      STATUS_ENUM.CANCELED,
    ],
    default: STATUS_ENUM.ACTIVE,
  })
  status?: STATUS_ENUM;
}
