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
    type: "timestamp",
    default: "now()",
  })
  created_date!: Date;

  @Column()
  @UpdateDateColumn({
    type: "timestamp",
    default: "now()",
  })
  last_modified_date!: Date;

  @Column({
    nullable: true,
  })
  created_by?: number;

  @Column({
    nullable: true,
  })
  last_modified_by!: number;

  @Column({
    type: "enum",
    enum: [STATUS_ENUM.ACTIVE, STATUS_ENUM.INACTIVE],
    default: STATUS_ENUM.ACTIVE,
  })
  status!: STATUS_ENUM;
}
