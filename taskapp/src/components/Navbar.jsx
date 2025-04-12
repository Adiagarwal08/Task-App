import { Link } from "react-router-dom";
import logotaskapp from "../images/logotaskapp.png";
import useLogout from "../hooks/useLogout";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { logout } = useLogout();

  const { user } = useContext(AuthContext);

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
      className="flex items-center justify-between bg-gradient-to-br from-orange-100 via-yellow-50 to-blue-50 py-4 px-8"
    >
      <Link to="/" className="flex gap-2 items-center flex-1">
        <img
          src={logotaskapp}
          alt="logo"
          className="max-h-10 max-w-10 rounded-full"
        />
        <span className="text-lg">Task App</span>
      </Link>

      <div className="hidden md:flex gap-6 items-center justify-between">
        <Link to="/" className="font-semibold">
          Home
        </Link>
        <button className="bg-blue-500 px-2 py-1 rounded-lg text-white font-semibold">
          <Link to="/form">Add Task</Link>
        </button>
        {user && (
          <div className="flex items-center gap-4">
            <span>{user.email}</span>
            <button
              className="bg-blue-500 px-2 py-1 rounded-lg text-white font-semibold"
              onClick={handleClick}
            >
              Log out
            </button>
          </div>
        )}
        {!user && (
          <div className="flex gap-3">
            <Link to="/login" className="font-semibold">
              Login
            </Link>
            <Link to="/signup" className="font-semibold">
              Signup
            </Link>
          </div>
        )}
      </div>
      <button
        className="p-2 md:hidden"
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
        <div id="nav-bar" className="flex justify-between">
          <Link to="/" className="flex gap-2 items-center flex-1">
            <img
              src={logotaskapp}
              alt="logo"
              className="max-h-10 max-w-10 rounded-full"
            />
            <span className="text-lg">Task App</span>
          </Link>
          <button
            className="p-2 md:hidden"
            onClick={() => {
              handleMenu();
            }}
          >
            <i className="fa-solid fa-xmark text-gray-600 hover:cursor-pointer"></i>
          </button>
        </div>
        <div className="mt-6">
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
            <div className="flex flex-col gap-4">
              <span>{user.email}</span>
              <button
                className="bg-blue-500 px-2 py-1 rounded-lg text-white font-semibold max-w-[150px]"
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
