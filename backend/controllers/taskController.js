import Task from "../models/taskModel.js";
import mongoose from "mongoose";

const getTasks = async (req, res) => {
  try {
    const user_id = req.user._id;

    const tasks = await Task.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

const getTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such task." });
  }

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ error: "No such task." });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error });
  }
};

const addTask = async (req, res) => {
  try {
    const user_id = req.user._id;
    const { title, description, date } = req.body;

    const task = await Task.create({ title, description, date, user_id });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error adding task", error });
  }
};

const editTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Error editing task" });
  }

  try {
    const task = await Task.findOneAndUpdate({ _id: id }, { ...req.body });

    if (!task) {
      return res.status(400).json({ error: "No such task" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error adding task", error });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Error deleting task" });
  }
  try {
    const task = await Task.findOneAndDelete({ _id: id });

    if (!task) {
      return res.status(400).json({ error: "No such task" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};

export { getTasks, getTask, addTask, editTask, deleteTask };
