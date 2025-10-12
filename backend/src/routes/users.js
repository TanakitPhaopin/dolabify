import { createUser } from "../controllers/users";
import express from "express";

const userRouter = express.Router();

// Route to create a new user
userRouter.post("/signup", createUser);

export default userRouter;