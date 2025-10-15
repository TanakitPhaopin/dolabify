import express from "express";
import { checkAuth, refreshToken } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.get("/check-auth", checkAuth);
authRouter.post("/refresh-token", refreshToken);

export default authRouter;