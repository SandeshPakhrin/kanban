import { Router } from "express";
import { createTask, deleteTask, getTasks, updateTask } from "../controller/taskController.js";

const taskRouter =  Router();

taskRouter.post("/", createTask);
taskRouter.get("/", getTasks);
taskRouter.put("/:id", updateTask);
taskRouter.delete("/:id", deleteTask);


export default taskRouter;