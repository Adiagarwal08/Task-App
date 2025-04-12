import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { dispatch } = useContext(AuthContext);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:4000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    }
  };
  return { login, isLoading, error };
};

export default useLogin;
