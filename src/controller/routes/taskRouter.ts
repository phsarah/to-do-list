import express from "express";
import { TaskController } from "../TaskController";

export const userRouter = express.Router();

const taskController = new TaskController();

userRouter.put("/task", taskController.createTask);
