import express from "express";
import {
  createBook,
  updateBook,
  listBooks,
  getSingleBook,
} from "./bookController";
import multer from "multer";
import path from "path";
import authenticate from "../middelwares/authenticate";
const bookRouter = express.Router();
// file store local
const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  limits: { fileSize: 3e7 },
});
// Routes

bookRouter.post(
  "/",
  authenticate,
  //multer
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createBook
);

bookRouter.patch(
  "/:bookId",
  authenticate,
  //multer
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  updateBook
);

bookRouter.get("/", listBooks);
// bookRouter.get("/:bookId", getSingleBook);

export default bookRouter;
