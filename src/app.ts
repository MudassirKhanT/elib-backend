import express, { Request, Response, NextFunction } from "express";
import globalErrorHandler from "./middlewares/globalErrorHandlers";
import userRouter from "./middlewares/user/userRouter";
import bookRouter from "./middlewares/book/bookRouter";
const app = express();
app.use(express.json());
//Routes
//HTTP methods get put post delete patch
app.get("/", (req, res, next) => {
  res.json({ message: "Welcome to elib apis" });
});

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

//Global error handler
app.use(globalErrorHandler);

export default app;
