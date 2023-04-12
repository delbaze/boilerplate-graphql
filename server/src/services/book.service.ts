import { Repository } from "typeorm";
import datasource from "../lib/datasource";
import Book from "../entities/book.entity";
import { IAddBook } from "../resolvers/book";

export default class BookService {
  db: Repository<Book>;
  constructor() {
    this.db = datasource.getRepository("Book");
  }

  async listBooks() {
    return this.db.find();
  }

  async addBook({ title }: IAddBook) {
    return await this.db.save({ title });
  }
}
