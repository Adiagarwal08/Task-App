import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };
  return (
    <div className="mt-16">
      <form
        onSubmit={handleSubmit}
        className="px-4 py-4 flex flex-col gap-6 items-center  bg-slate-100 mx-auto border border-slate-50 shadow-md max-w-[300px] md:max-w-[400px] rounded-lg "
      >
        <h3 className=" text-2xl md:text-3xl mb-6 font-semibold">Login:</h3>
        <label>Email:</label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full text-center focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        <label>Password:</label>
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full text-center focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        <input
          type="submit"
          disabled={isLoading}
          value="Login"
          className="p-2 border border-gray-300 rounded-lg w-full text-center hover:cursor-pointer text-white bg-blue-500 font-semibold"
        />
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default Login;
