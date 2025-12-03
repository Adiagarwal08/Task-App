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
    <div className="mt-16 px-4 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="relative px-6 py-8 flex flex-col gap-6 items-center bg-slate-100/90 mx-auto border border-slate-50 shadow-xl max-w-[320px] md:max-w-[420px] rounded-2xl backdrop-blur-md overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_#93c5fd_0,_transparent_55%),_radial-gradient(circle_at_bottom,_#f97316_0,_transparent_55%)]" />
        <div className="relative w-full flex flex-col gap-6 items-center">
          <h3 className=" text-2xl md:text-3xl mb-1 font-semibold text-slate-800">
            Welcome back
          </h3>
          <p className="text-sm text-slate-500 mb-2 text-center">
            Log in to manage your tasks and stay on top of your day.
          </p>
        <label>Email:</label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full text-center focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow bg-white/80"
        />
        <label>Password:</label>
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full text-center focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow bg-white/80"
        />
        <input
          type="submit"
          disabled={isLoading}
          value="Login"
          className="p-2 border border-gray-300 rounded-lg w-full text-center hover:cursor-pointer cursor-pointer text-white bg-blue-600 font-semibold hover:bg-blue-700 active:scale-95 transition-transform transition-colors"
        />
        {error && <div>{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default Login;
