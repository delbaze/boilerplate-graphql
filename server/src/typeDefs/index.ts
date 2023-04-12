import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files"; //permet de charger les fichiers selon les options définies, un genre de filesystem un peu pratique pour gql.
import { mergeTypeDefs } from "@graphql-tools/merge";

const typesArray = loadFilesSync(path.join(__dirname, "."), {
  extensions: ["gql"], //permet de récupérer tous les fichiers gql contenant les typedefs
  recursive: true, //permet d'aller chercher dans les sous dossiers si vous en faites
});

export default mergeTypeDefs(typesArray);
