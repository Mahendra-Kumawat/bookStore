import { NextFunction, Request, Response } from "express";
import UserModel from "../../models/usersModel/usersModel";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../types/userTypes";
import { config } from "../../config/config";
import { JwtPayloadData } from "../../types/jwtTypes";
import { AuthRequest } from "../../types/authRequest";

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
                userId: user._id,
                email: user.email,
            } as JwtPayloadData,
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
        maxAge: 1000 * 60 * 60 * 24, //this is just for testing, you can change it to 7 days
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
                userId: user._id,
                email: user.email,
            } as JwtPayloadData,
            config.JWT_SECRET_KEY as string,
            {
                expiresIn: "7d",
            },
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: config.env === "production",
            sameSite: config.env === "production" ? "none" : "strict",
            maxAge: 1000 * 60 * 60 * 24, //this is just for testing, you can change it to 7 days
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

export const userProfile = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    const { userId } = req.user as JwtPayloadData;

    if (!userId) {
        return next(createHttpError(401, "Unauthorized access"));
    }

    try {
        const user = await UserModel.findById(userId, {
            name: 1,
            email: 1,
        }).select("-password");
        if (!user) {
            return next(createHttpError(404, "User not found"));
        }

        return res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            data: {
                user,
            },
        });
    } catch (error) {
        return next(createHttpError(500, "Database error while fetching user"));
    }
};
