import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { TaskContext } from "../contexts/TaskContext";

const useLogout = () => {
  const { dispatch } = useContext(AuthContext);

  const { dispatch: tasksDispatch } = useContext(TaskContext);

  const logout = () => {
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
    tasksDispatch({ type: "SET_TASKS", tasks: null });
  };
  return { logout };
};

export default useLogout;
