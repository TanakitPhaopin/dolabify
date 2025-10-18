import express from "express";
import { checkAuth, refreshToken, logoutUser } from "../controllers/auth.js";
import { createUser, loginUser } from "../controllers/users.js";
import verifyAuth from "../middleware/auth.js";

const authRouter = express.Router();

authRouter.post("/signup", createUser);

authRouter.post("/login", loginUser);

authRouter.get("/check-auth", verifyAuth, checkAuth);

authRouter.post("/refresh-token", refreshToken);

authRouter.post("/logout", logoutUser);

export default authRouter;