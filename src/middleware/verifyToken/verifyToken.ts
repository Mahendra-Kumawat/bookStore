import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { config } from "../../config/config";
import { JwtPayloadData } from "../../types/jwtTypes";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    if (!token) {
        next(createHttpError(401, "unauthorized access, no token provided"));
        return;
    }

    try {
        const decoded = jwt.verify(
            token,
            config.JWT_SECRET_KEY as string,
        ) as JwtPayloadData;
        req.user = decoded;

        console.log(req);
        next();
    } catch (error) {
        // Here you would typically verify the token using a library like jsonwebtoken
        // For example:

        next(createHttpError(401, "Invalid token"));
        return;
    }
};

export default verifyToken;
//
