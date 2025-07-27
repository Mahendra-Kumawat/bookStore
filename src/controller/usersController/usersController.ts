import { NextFunction, Request, Response } from "express";

export const register = (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    console.log("User registration data:", { name, email, password });

    // validation

    res.status(201).json({
        message: "User registered successfully",
    });
};
