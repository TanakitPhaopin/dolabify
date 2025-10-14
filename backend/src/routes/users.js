import { createUser, loginUser } from "../controllers/users.js";
import express from "express";

const userRouter = express.Router();

// Route to create a new user
userRouter.post("/signup", createUser);

// Route to login a user
userRouter.post("/login", loginUser);

export default userRouter;