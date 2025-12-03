import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import TaskForm from "./components/TaskForm";
import { TaskContextProvider } from "./contexts/TaskContext";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserProfile from "./components/UserProfile";
import { AuthContext } from "./contexts/AuthContext";
import { useContext } from "react";

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <BrowserRouter>
        <TaskContextProvider>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route path="/form" element={<TaskForm />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/profile"
              element={user ? <UserProfile /> : <Navigate to="/login" />}
            />
          </Routes>
        </TaskContextProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
