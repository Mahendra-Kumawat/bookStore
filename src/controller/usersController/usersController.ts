import { NextFunction, Request, Response } from "express";
import UserModel from "../../models/usersModel/usersModel";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { name, email, password } = req.body;

    console.log("User registration data:", { name, email });

    // Step 1: Check if user already exists
    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return next(createHttpError(400, "User already exists"));
        }
    } catch (error) {
        return next(
            createHttpError(
                500,
                "Database error while checking user existence",
            ),
        );
    }

    // Step 2: Hash the password
    let hashedPassword: string;
    try {
        hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
        return next(createHttpError(500, "Error while hashing the password"));
    }

    // Step 3: Create the user in the database
    try {
        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        return next(createHttpError(500, "Database error while creating user"));
    }
};
