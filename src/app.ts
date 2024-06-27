import express, { Request, Response, NextFunction } from "express";
import globalErrorHandler from "./middelwares/globalErrorHandlers";
import userRouter from "./user/userRouter";
import bookRouter from "./book/bookRouter";
import { config } from "./config/config";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: config.frontEndDomain,
  })
);
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
