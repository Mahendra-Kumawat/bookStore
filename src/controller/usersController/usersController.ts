import { NextFunction, Request, Response } from "express";
import UserModel from "../../models/usersModel/usersModel";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../types/userTypes";
import { config } from "../../config/config";
import { JwtPayload } from "../../types/jwtTypes";

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

    let user: User;
    try {
        user = await UserModel.create({
            name,
            email,
            password: hashedPassword,
        });
    } catch (error) {
        return next(createHttpError(500, "Database error while creating user"));
    }

    // generate the token
    let token: string;
    try {
        token = jwt.sign(
            {
                id: user._id,
                email: user.email,
            } as JwtPayload,
            config.JWT_SECRET_KEY as string,
            {
                expiresIn: "7d",
            },
        );
    } catch (error) {
        return next(createHttpError(500, "Error while generating token"));
    }

    res.cookie("token", token, {
        httpOnly: true,
        secure: config.env === "production",
        sameSite: "strict",
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
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return next(createHttpError(400, "Invalid email or password"));
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return next(createHttpError(400, "Invalid email or password"));
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
            } as JwtPayload,
            config.JWT_SECRET_KEY as string,
            {
                expiresIn: "7d",
            },
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: config.env === "production",
            sameSite: config.env === "production" ? "none" : "strict",
            maxAge: 1000 * 2, //this is just for testing, you can change it to 7 days
        });

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                id: user._id,
            },
        });
    } catch (error) {
        return next(createHttpError(500, "Database error while logging in"));
    }
};
