import "./App.css";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

function App() {
  const { userInfos } = useAuth();
  return (
    <div className="App">
      <NavLink to={"/login"}>Se connecter</NavLink>
      <NavLink to={"/books"}>Liste des livres</NavLink>
      <NavLink to={"/logout"}>Se déconnecter</NavLink>
      {Object.keys(userInfos).length > 0 && (
        <p>connecté en tant que {userInfos?.email}</p>
      )}
      <Outlet />
    </div>
  );
}

export default App;
