import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }, []);
  return <div>Vous allez être déconnectés</div>;
}

export default Logout;
