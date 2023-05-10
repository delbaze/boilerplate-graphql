import { useEffect } from "react";
import { useCheckTokenQuery } from "../generated";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function ProtectedArea({ children }: { children: JSX.Element }) {
  const { userInfos } = useAuth();
  const navigate = useNavigate();
  const { refetch, loading } = useCheckTokenQuery({
    onCompleted(data) {
      console.log('%c⧭', 'color: #aa00ff', data);
      if (!data.checkToken) {
        navigate("/login");
      }
    },
    onError(error) {
      console.log("ERROR", error);
    },
  });

  useEffect(() => {
    refetch();
  }, [userInfos]);
  return <>{loading ? "Chargement en cours" : children}</>;
}

export default ProtectedArea;
