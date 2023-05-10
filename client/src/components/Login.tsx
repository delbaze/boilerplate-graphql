import { useState } from "react";
import { useLoginLazyQuery } from "../generated";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const { setUserData } = useAuth();
  const [login, { error, loading }] = useLoginLazyQuery({
    onCompleted(data) {
      setUserData(data.login);
      navigate("/books");
    },
  });
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state.email && state.password) {
      login({
        variables: {
          infos: {
            ...state,
          },
        },
      });
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  return (
    <div>
      {error && error.message}
      <form onSubmit={handleSubmit}>
        <div>
          <input placeholder="email" name="email" onChange={handleChange} />
        </div>
        <div>
          <input
            placeholder="password"
            type="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <button disabled={loading} type="submit" name="login">
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default Login;
