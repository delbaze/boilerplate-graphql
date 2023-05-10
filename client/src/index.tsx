import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import BooksList from "./components/BooksList";
import ProtectedArea from "./components/ProtectedArea";
import AuthContextProvider from "./contexts/AuthContext";
import Logout from "./components/Logout";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const httpLink = createHttpLink({
  uri: "http://localhost:4000",
  credentials: "same-origin",
});

const authLink = setContext((_, { headers }) => {
  //on va modifier les headers envoyés pour chaque requête

  //on récupère le token dans le localStorage préalablement stocké lors d'un login
  const token = localStorage.getItem("token");

  //pour finir on retourne les headers modifiés
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "", // on y injecte le token
    },
  };
});
const client = new ApolloClient({
  cache: new InMemoryCache({ addTypename: false }),
  link: authLink.concat(httpLink),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "books",
        element: (
          <ProtectedArea>
            <BooksList />
          </ProtectedArea>
        ),
      },
      {
        path: "logout",
        element: <Logout />,
      },
    ],
  },
]);

root.render(
  // <React.StrictMode>

  <ApolloProvider client={client}>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </ApolloProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
