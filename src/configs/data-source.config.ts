import { DataSource } from "typeorm";
import { Book } from "../models/book.model";
import {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
} from "../environment/variable.env";
import { User } from "../models/user.model";
const entities = [Book, User];

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities,
  synchronize: true, // Only for development
});
