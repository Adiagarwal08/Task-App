import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TaskContext } from "../contexts/TaskContext";
import { AuthContext } from "../contexts/AuthContext";

const TaskForm = () => {
  const { dispatch } = useContext(TaskContext);

  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in.");
      return;
    }

    const newTask = { title, description, date };

    try {
      const response = await fetch("http://localhost:4000/api/tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        const json = await response.json();
        dispatch({ type: "ADD_TASK", task: json });
        setTitle("");
        setDescription("");
        setDate("");
        navigate("/");
      } else {
        console.log("Failed to add task.");
      }
    } catch (error) {
      console.log("Error adding task", error.message);
    }
  };
  return (
    <div className="mt-16 px-4">
      <form
        onSubmit={handleSubmit}
        className="px-4 py-6 flex flex-col gap-6 items-center bg-slate-100 mx-auto border border-slate-50 shadow-lg max-w-[320px] md:max-w-[420px] rounded-2xl backdrop-blur-sm"
      >
        <h3 className=" text-2xl md:text-3xl mb-2 font-semibold text-slate-800">
          Add New Task
        </h3>
        <input
          required
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full text-center focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
        />
        <input
          required
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full text-center focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
        />
        <input
          required
          type="date"
          placeholder="DD/MM/YYYY"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full text-center focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
        />
        <input
          type="submit"
          value="Add Task"
          className="p-2 border border-gray-300 rounded-lg w-full text-center hover:cursor-pointer cursor-pointer text-white bg-blue-500 font-semibold hover:bg-blue-600 active:scale-95 transition-transform transition-colors"
        />
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default TaskForm;
