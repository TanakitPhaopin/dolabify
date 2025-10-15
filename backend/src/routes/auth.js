import express from "express";
import { checkAuth, refreshToken } from "../controllers/auth.js";
import { createUser, loginUser } from "../controllers/users.js";

const authRouter = express.Router();

authRouter.post("/signup", createUser);

authRouter.post("/login", loginUser);

authRouter.get("/check-auth", checkAuth);

authRouter.post("/refresh-token", refreshToken);


export default authRouter;