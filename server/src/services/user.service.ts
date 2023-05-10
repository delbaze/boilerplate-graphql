import { Repository } from "typeorm";
import datasource from "../lib/datasource";
import User from "../entities/user.entity";
// import User, { UserRegister } from "../entities/user.entity";

import * as jwt from "jsonwebtoken";
export default class UserService {
  db: Repository<User>;
  constructor() {
    this.db = datasource.getRepository("User");
  }

  async listUsers() {
    return this.db.find();
  }
  async findByEmail(email: string) {
    return this.db.findOneBy({ email });
  }

  async register({ email, password }: any) {
  // async register({ email, password }: UserRegister) {
    return await this.db.save({ email, password });
  }

  async getAndCheckToken(authorization: string | undefined) {
    let payload = null;
    if (authorization) {
      try {
        let token = authorization?.split(" ")[1]; // sur "Bearer <token>" on récupère le token
        if (token) {
          payload = jwt.verify(token, `${process.env.SECRET_KEY}`);
        }
      } catch (err) {
        console.log("error", err);
        // throw new GraphQLError("Une erreur s'est produite avec le token"); // le throw bloquerait notre serveur apollo, d'où le fait de ne pas lever l'erreur ici, mais payload étant null, le context gerera ce cas là
      }
    }
    return payload;
  }
}
