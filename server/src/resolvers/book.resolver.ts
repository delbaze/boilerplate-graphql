import BookService from "../services/book.service";
import { IAddBook } from "./book";

export default {
  Query: {
    books: async () => {
      return await new BookService().listBooks();
    }
  },

  Mutation: {
    addBook: async (_: any, { title }: IAddBook) => {
      return await new BookService().addBook({ title });
    },
  },
};
