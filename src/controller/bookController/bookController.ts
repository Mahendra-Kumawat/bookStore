import { NextFunction, Request, Response } from "express";

import bookModel from "../../models/booksModel/booksModel";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { AuthRequest } from "../../types/authRequest";
import { JwtPayloadData } from "../../types/jwtTypes";

export const createBook = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    const { name, description, price, author } = req.body;

    const { userId } = req.user as JwtPayloadData;
    const { coverImage, file } = req.files as {
        coverImage: Express.Multer.File[];
        file: Express.Multer.File[];
    };

    console.log("the files are here ====> ", coverImage, file);

    try {
        const coverImageUrl = await uploadToCloudinary(
            coverImage[0],
            "books_cover_images",
        );
        const bookUrl = await uploadToCloudinary(file[0], "books");

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
