import { useContext, useMemo, useState } from "react";
import { TaskContext } from "../contexts/TaskContext";
import { format, isSameDay, isBefore } from "date-fns";
import { AuthContext } from "../contexts/AuthContext";

const Home = () => {
  const { tasks, dispatch } = useContext(TaskContext);

  const { user } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("all");

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

  const filteredTasks = useMemo(() => {
    if (!tasks) return [];

    const today = new Date();
    return tasks.filter((task) => {
      const taskDate = new Date(task.date);
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesFilter = true;
      const isTodayDeadline = isSameDay(taskDate, today);
      const isPast = isBefore(taskDate, today) && !isTodayDeadline;

      switch (filterOption) {
        case "today":
          matchesFilter = isTodayDeadline;
          break;
        case "upcoming":
          matchesFilter = !isPast && !isTodayDeadline;
          break;
        case "past":
          matchesFilter = isPast;
          break;
        default:
          matchesFilter = true;
      }

      return matchesSearch && matchesFilter;
    });
  }, [tasks, searchTerm, filterOption]);

  return (
    <div className="py-4 px-4 md:px-8 mt-8 min-h-[calc(100vh-180px)] flex flex-col">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-stretch md:items-center mb-6">
        <input
          type="text"
          placeholder="Search tasks by title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
          className="w-full md:w-56 p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">All tasks</option>
          <option value="today">Due today</option>
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
        </select>
      </div>
      <div className="flex flex-col lg:flex-row flex-wrap gap-6 justify-start flex-1">
        {filteredTasks.map((task) => {
          const isTodayDeadline = isSameDay(new Date(task.date), new Date());
          return (
          <div
            key={task._id}
            className={`flex flex-col justify-between flex-1 min-w-[260px] lg:max-w-[360px] h-[300px] bg-slate-50 text-slate-800 rounded-xl border shadow-lg transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl overflow-hidden ${
              isTodayDeadline
                ? "border-2 border-amber-500 ring-2 ring-amber-200"
                : "border-gray-300"
            }`}
          >
            <div className="flex flex-row items-center justify-between bg-gray-400 px-4 py-3 rounded-t-xl">
              <h3 className="font-semibold text-white text-xl">{task.title}</h3>
              <button className="hover:cursor-pointer cursor-pointer">
                <i className="fa-solid fa-pencil"></i>
              </button>
            </div>
            <p className="px-4 py-3 text-sm md:text-base flex-1 overflow-y-auto">
              {task.description}
            </p>
            <div className="flex flex-row justify-between items-center px-4 py-3 bg-amber-50 rounded-b-xl">
              <div className="flex flex-col">
                <p className="text-sm text-slate-600">
                  {format(new Date(task.date), "yyyy-MM-dd")}
                </p>
                {isTodayDeadline && (
                  <span className="mt-1 inline-flex items-center text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                    Due today
                  </span>
                )}
              </div>
              <button
                className="hover:cursor-pointer cursor-pointer"
                onClick={() => deleteTask(task._id)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        );
        })}
        {filteredTasks.length === 0 && (
          <p className="text-slate-500 mt-4">
            No tasks match your criteria. Try adjusting your search or filters.
          </p>
        )}
      </div>
      <footer className="mt-8 border-t border-slate-200 pt-4 text-xs md:text-sm text-slate-500 flex flex-col md:flex-row items-center justify-between gap-2">
        <span>
          © {new Date().getFullYear()} Task App. All rights reserved.
        </span>
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 text-center md:text-right">
          <span className="hover:text-blue-600 transition-colors">
            Built to help you plan, prioritize and complete your daily tasks
            with ease.
          </span>
          <span className="hover:text-blue-600 transition-colors">
            Contact us: taskapp@example.com
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
