import express, { Request, Response, NextFunction } from "express";
import globalErrorHandler from "./middlewares/globalErrorHandlers";
import userRouter from "./middlewares/user/userRouter";
const app = express();
app.use(express.json());
//Routes
//HTTP methods get put post delete patch
app.get("/", (req, res, next) => {
  res.json({ message: "Welcome to elib apis" });
});

app.use("/api/users", userRouter);

//Global error handler
app.use(globalErrorHandler);

export default app;
