import { DataSource } from "typeorm";
import Book from "../entities/book.entity";
import User from "../entities/user.entity";


export default new DataSource({
  type: "sqlite",
  database: "./demo.sqlite",
  synchronize: true,
  entities: [Book, User],
  logging: ["query", "error"],
});
