import { NextFunction, Request, Response } from "express";

export const createBook = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    return res.status(200).json({
        success: true,
        message: "Book created successfully",
    })
};
