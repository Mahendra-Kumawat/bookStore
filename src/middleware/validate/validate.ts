import { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";
export const validate =
    (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    status: "error",
                    message: "Validation failed",
                    errors: error.issues?.map((issue) => ({
                        path: issue.path.join("."),
                        message: issue.message,
                    })),
                });
            }
            next(error);
        }
    };
