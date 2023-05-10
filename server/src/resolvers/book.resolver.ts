import { GraphQLError } from "graphql";
import BookService from "../services/book.service";
import { IAddBook } from "./book";
import { IContext } from "../index.d";

export default {
  Query: {
    books: async (_: any, {}, { user }: IContext) => {
      if (!user) {
        throw new GraphQLError("Vous devez être authentifié!");
      }
      return await new BookService().listBooks();
    },
  },

  Mutation: {
    addBook: async (_: any, { title }: IAddBook) => {
      return await new BookService().addBook({ title });
    },
  },
};
