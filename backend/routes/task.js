import express from "express";
import requireAuth from "../midddleware/requireAuth.js";
import {
  getTasks,
  getTask,
  addTask,
  editTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.use(requireAuth);

router.get("/", getTasks);

router.get("/:id", getTask);

router.post("/", addTask);

router.patch("/:id", editTask);

router.delete("/:id", deleteTask);

export default router;
