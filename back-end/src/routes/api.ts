import { Router } from "express";
import userRouter from "./users";
import weatherRouter from "./weather";

// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use("/users", userRouter);
baseRouter.use("/weather", weatherRouter);

// Export default.
export default baseRouter;
