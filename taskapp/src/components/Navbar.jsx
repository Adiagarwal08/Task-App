import { Link, useNavigate } from "react-router-dom";
import logotaskapp from "../images/logotaskapp.png";
import useLogout from "../hooks/useLogout";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { logout } = useLogout();

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const getInitials = () => {
    if (!user) return "";
    if (user.name) {
      const parts = user.name.trim().split(" ");
      const initials = parts
        .filter((p) => p.length > 0)
        .slice(0, 2)
        .map((p) => p[0].toUpperCase())
        .join("");
      return initials || user.email.charAt(0).toUpperCase();
    }
    return user.email ? user.email.charAt(0).toUpperCase() : "";
  };

  const handleMenu = () => {
    const navDialog = document.getElementById("nav-dialog");
    if (navDialog) {
      navDialog.classList.toggle("hidden");
    }
  };

  const handleClick = () => {
    logout();
  };
  return (
    <div
      id="nav"
      className="flex items-center justify-between bg-gradient-to-br from-orange-100 via-yellow-50 to-blue-50 py-4 px-4 md:px-8 shadow-sm sticky top-0 z-20"
    >
      {/* Left: Logo */}
      <div className="flex flex-1 items-center">
        <Link to="/" className="flex gap-2 items-center">
          <img
            src={logotaskapp}
            alt="logo"
            className="h-10 w-10 rounded-full shadow-sm"
          />
          <span className="text-lg md:text-xl font-semibold tracking-tight text-slate-800">
            Task App
          </span>
        </Link>
      </div>

      {/* Middle: Nav links */}
      <div className="hidden md:flex flex-1 justify-center items-center gap-6">
        <Link
          to="/"
          className="font-semibold text-slate-700 hover:text-blue-600 transition-colors"
        >
          Home
        </Link>
        <Link
          to="/form"
          className="bg-blue-500 px-4 py-2 rounded-full text-white font-semibold shadow-sm hover:bg-blue-600 active:scale-95 transition-transform transition-colors"
        >
          Add Task
        </Link>
      </div>

      {/* Right: Auth / Avatar */}
      <div className="hidden md:flex flex-1 justify-end items-center gap-4">
        {user && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold shadow-sm hover:bg-blue-600 active:scale-95 transition-transform transition-colors cursor-pointer"
            >
              {getInitials()}
            </button>
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium text-slate-800 leading-tight">
                {user.name || user.email.split("@")[0]}
              </span>
              <span className="text-xs text-slate-500 truncate max-w-[140px]">
                {user.email}
              </span>
            </div>
            <button
              className="bg-slate-800 px-3 py-2 rounded-full text-white text-sm font-semibold shadow-sm hover:bg-slate-900 active:scale-95 transition-transform transition-colors cursor-pointer"
              onClick={handleClick}
            >
              Log out
            </button>
          </div>
        )}
        {!user && (
          <div className="flex gap-3">
            <Link
              to="/login"
              className="font-semibold text-slate-700 hover:text-blue-600 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="font-semibold text-slate-700 hover:text-blue-600 transition-colors"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
      <button
        className="p-2 md:hidden ml-2 cursor-pointer"
        onClick={() => {
          handleMenu();
        }}
      >
        <i className="fa-solid fa-bars text-gray-600 hover:cursor-pointer"></i>
      </button>

      <div
        id="nav-dialog"
        className="hidden fixed z-10 md:hidden bg-white inset-0 p-3"
      >
        <div id="nav-bar" className="flex justify-between items-center">
          <Link to="/" className="flex gap-2 items-center flex-1">
            <img
              src={logotaskapp}
              alt="logo"
              className="max-h-10 max-w-10 rounded-full"
            />
            <span className="text-lg">Task App</span>
          </Link>
          <button
            className="p-2 md:hidden cursor-pointer"
            onClick={() => {
              handleMenu();
            }}
          >
            <i className="fa-solid fa-xmark text-gray-600 hover:cursor-pointer"></i>
          </button>
        </div>
        <div className="mt-6 space-y-2">
          <Link
            to="/"
            onClick={handleMenu}
            className="font-medium block m-3 p-3 hover:bg-gray-50 rounded-lg"
          >
            Home
          </Link>
          <Link
            to="/form"
            onClick={handleMenu}
            className="font-medium block m-3 p-3 hover:bg-gray-50 rounded-lg"
          >
            Add Task
          </Link>
          {user && (
            <div className="flex flex-col gap-4 m-3 p-3 border rounded-lg bg-slate-50">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    handleMenu();
                    navigate("/profile");
                  }}
                  className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold shadow-sm hover:bg-blue-600 active:scale-95 transition-transform transition-colors cursor-pointer"
                >
                  {getInitials()}
                </button>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-800">
                    {user.name || user.email.split("@")[0]}
                  </span>
                  <span className="text-xs text-slate-500">{user.email}</span>
                </div>
              </div>
              
              <button
                className="bg-slate-800 px-3 py-2 rounded-full text-white text-sm font-semibold shadow-sm hover:bg-slate-900 active:scale-95 transition-transform transition-colors max-w-[150px] cursor-pointer"
                onClick={handleClick}
              >
                Log out
              </button>
            </div>
          )}
          {!user && (
            <div className="flex flex-col">
              <Link
                to="/login"
                onClick={handleMenu}
                className="font-medium block m-3 p-3 hover:bg-gray-50 rounded-lg"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={handleMenu}
                className="font-medium block m-3 p-3 hover:bg-gray-50 rounded-lg"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
