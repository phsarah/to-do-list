import express from "express";
import { UserController } from "../UserController";

export const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/user/create", userController.signup);
userRouter.get("/user/:id", userController.getUserById);
userRouter.post('/user/edit/:id', userController.editUserById);

