import { NextFunction, Request, Response } from "express";

import bookModel from "../../models/booksModel/booksModel";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { AuthRequest } from "../../types/authRequest";
import { JwtPayloadData } from "../../types/jwtTypes";
import createHttpError from "http-errors";

export const createBook = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    const { name, description, price } = req.body;

    const { userId } = req.user as JwtPayloadData;
    const { coverImage, file } = req.files as {
        coverImage: Express.Multer.File[];
        file: Express.Multer.File[];
    };

    console.log("the files are here ====> ", coverImage, file);

    try {
        // const coverImageUrl = await uploadToCloudinary(
        //     coverImage[0],
        //     "books_cover_images",
        // );
        // const bookUrl = await uploadToCloudinary(file[0], "books");

        const [coverImageUrl, bookUrl] = await Promise.all([
            uploadToCloudinary(coverImage[0], "books_cover_images"),
            uploadToCloudinary(file[0], "books"),
        ]);

        const book = await bookModel.create({
            name,
            author: userId,
            description,
            price,
            coverImage: coverImageUrl,
            file: bookUrl,
        });

        return res.status(200).json({
            success: true,
            message: "Book created successfully",
            data: {
                id: book._id,
            },
        });
    } catch (error) {
        return next(error);
    }
};

export const updateBook = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    const { name, description, price } = req.body;

    console.log("name is here ====> ", name);
    console.log("description is here ====> ", description);
    console.log("price is here ====> ", price);

    const { coverImage, file } = req.files as {
        coverImage: Express.Multer.File[];
        file: Express.Multer.File[];
    };

    if (!coverImage || !file) {
        return next(createHttpError(400, "Please provide coverImage and file"));
    }

    console.log("coverImage is here ====> ", coverImage);

    const { bookId } = req.params;

    try {
        const book = await bookModel.findOne({ _id: bookId });

        if (!book) {
            return next(createHttpError(404, "Book not found"));
        }

        if (book.author.toString() !== req.user?.userId) {
            return next(createHttpError(403, "Unauthorized access"));
        }

        const [coverImageUrl, bookUrl] = await Promise.all([
            uploadToCloudinary(coverImage[0], "books_cover_images"),
            uploadToCloudinary(file[0], "books"),
        ]);

        const newBook = await bookModel.findOneAndUpdate(
            {
                _id: bookId,
            },
            {
                name,
                description,
                price,
                coverImage: coverImageUrl,
                file: bookUrl,
            },
            {
                new: true,
            },
        );

        return res.status(200).json({
            success: true,
            message: "book update Successfully",
            data: newBook,
        });
    } catch (error) {
        next(error);
    }

    return res.status(200).json({});
};

export const deleteBook = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    const bookId = req.params.bookId;

    console.log(bookId);

    try {
        const book = await bookModel.findOne({ _id: bookId });

        if (!book) {
            return next(createHttpError(404, "Book not found"));
        }

        if (book.author.toString() !== req.user?.userId) {
            return next(createHttpError(403, "Unauthorized access"));
        }

        const result = await bookModel.deleteOne({ _id: bookId });

        if (result.deletedCount === 1) {
            return res.status(200).json({
                success: true,
                message: "Book deleted successfully",
                data: null,
            });
        }
    } catch (error) {
        next(error);
    }
};

export const listAllBooks = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const allBooks = await bookModel
            .find()
            .select("-__v")
            .populate("author", "name email");

        return res.status(200).json({
            success: true,
            message: "All books fetched successfully",
            data: allBooks,
        });
    } catch (error) {
        next(error);
    }
};
