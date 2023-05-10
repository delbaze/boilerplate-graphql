import { IContext, IPayload } from "./index.d";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import datasource from "./lib/datasource";
import UserService from "./services/user.service";

async function main() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }): Promise<IContext> => {
      let user = null; //le user est null par défaut, si le token est indiqué puis vérifié, à ce moment là le user deviendra celui récupéré en base de données
      const payload = (await new UserService().getAndCheckToken(
        req.headers.authorization
      )) as IPayload; //on récupère depuis "Bearer <token>" le token pour en vérifier ensuite l'authenticité s'il est renseigné
      if (payload) {
        // si un payload a pu être récupéré du token, on va chercher, à partir de l'email stocké dedans, le user pour pouvoir l'authentifier sur l'ensemble du contexte
        user = await new UserService().findByEmail(payload?.email);
      }
      //le return ci dessous va transmettre à tous les résolveurs, l'objet retourné grâce à @Ctx pour typegraphql ou le troisieme argument du résolveur dans le cas de graphql tout court (n'oubliez pas : parent, arguments, contexte, infos)
      return {
        user,
      };
    },
  });

  await datasource.initialize();
  console.log(`🚀  Server ready at: ${url}`);
}

main();
