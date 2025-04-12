import { createContext, useReducer, useEffect, useContext } from "react";
import taskReducer from "../reducers/taskReducer";
import { AuthContext } from "./AuthContext";

const TaskContext = createContext();

const TaskContextProvider = (props) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/tasks/", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (response.ok) {
          const json = await response.json();

          dispatch({ type: "SET_TASKS", tasks: json });
        }
      } catch (error) {
        console.log("Failed to fetch tasks: ", error.message);
      }
    };
    if (user) {
      getTasks();
    }
  }, [user]);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {props.children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskContextProvider };
