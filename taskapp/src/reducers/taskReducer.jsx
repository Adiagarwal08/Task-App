import { v4 as uuidv4 } from "uuid";

const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return action.tasks;
    case "ADD_TASK":
      return [...state, action.task];
    case "DELETE_TASK":
      return state.filter((task) => task._id != action.id);
    default:
      return state;
  }
};

export default taskReducer;
