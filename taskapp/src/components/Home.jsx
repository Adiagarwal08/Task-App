import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";
import { format } from "date-fns";
import { AuthContext } from "../contexts/AuthContext";

const Home = () => {
  const { tasks, dispatch } = useContext(TaskContext);

  const { user } = useContext(AuthContext);

  const deleteTask = async (id) => {
    if (!user) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:4000/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        dispatch({ type: "DELETE_TASK", id });
      } else {
        console.log("Error deleting task.");
      }
    } catch (error) {
      console.log("Error deleting task", error.message);
    }
  };

  return (
    <div className="py-4 px-8 flex flex-col lg:flex-row flex-wrap gap-8 justify-start mt-8">
      {tasks &&
        tasks.map((task) => (
          <div
            key={task._id}
            className="flex flex-col flex-1 min-w-[300px] lg:max-w-[385px] min-h-[200px] gap-4 bg-slate-50 text-slate-800 rounded-xl border border-gray-300 shadow-lg"
          >
            <div className="flex flex-row items-center justify-between bg-gray-400 px-4 py-4 rounded-t-xl">
              <h3 className="font-semibold text-white text-xl">{task.title}</h3>
              <button className="hover:cursor-pointer">
                <i className="fa-solid fa-pencil"></i>
              </button>
            </div>
            <p className="px-4 py-4">{task.description}</p>
            <div className="flex flex-row justify-between items-center px-4 py-4 bg-amber-100">
              <p>{format(new Date(task.date), "yyyy-MM-dd")}</p>
              <button
                className="hover:cursor-pointer"
                onClick={() => deleteTask(task._id)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Home;
