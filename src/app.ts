import express, { Request, Response, NextFunction } from "express";
import globalErrorHandler from "./middlewares/globalErrorHandlers";
const app = express();

//Routes
//HTTP methods get put post delete patch
app.get("/", (req, res, next) => {
  res.json({ message: "Welcome to elib apis" });
});

//Global error handler
app.use(globalErrorHandler);

export default app;
