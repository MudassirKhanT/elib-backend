import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinary";
import path from "path";
import fs from "node:fs";
import createHttpError from "http-errors";
import bookModel from "./bookModel";
const createBook = async (req: Request, res: Response, next: NextFunction) => {
  const { title, genre } = req.body;
  //console.log("files", req.files);
  //upload this files in cloudinary
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  // application/pdf
  const coverImageMimeType = await files.coverImage[0].mimetype
    .split("/")
    .at(-1);
  const fileName = files.coverImage[0].filename;
  const filePath = path.resolve(
    __dirname,
    "../../public/data/uploads",
    fileName
  );
  try {
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename_override: fileName,
      folder: "book-covers",
      format: coverImageMimeType,
    });
    console.log("uploadResult:", uploadResult);

    const bookFileName = files.file[0].filename?.replace(" ", "_");
    console.log("book name", bookFileName);
    const bookFilePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      bookFileName
    );
    console.log("book file path", bookFilePath);
    const bookFileUploadResult = await cloudinary.uploader.upload(
      bookFilePath,
      {
        resource_type: "raw",
        filename_override: bookFileName,
        folder: "book-pdfs",
        format: "pdf",
      }
    );
    console.log("bookFileUploadResult:", bookFileUploadResult);
    console.log("uploadResult:", uploadResult);

    const newBook = await bookModel.create({
      title,
      genre,
      author: "662fadbe83499a6175e2e6db",
      coverImage: (await uploadResult).secure_url,
      file: bookFileUploadResult.secure_url,
    });
    // delete temp files
    try {
      await fs.promises.unlink(filePath);
      await fs.promises.unlink(bookFilePath);
    } catch (err) {
      return next(createHttpError(500, "error while deleting the files"));
    }

    res.status(201).json({ id: newBook._id });
  } catch (err) {
    console.log("an error occurred", err);
    return next(createHttpError(500, "Error while uploading the files"));
  }
};

export default createBook;
