import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import { config } from "../../config/config";

const globalErrorHandler = (
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.log("inside global error handler");
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        stack: config.env === "production" ? null : err.stack,
    });
};

export default globalErrorHandler;
