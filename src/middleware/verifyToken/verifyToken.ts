import { NextFunction, Request, Response } from "express";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token provided",
        });
    }

    // Here you would typically verify the token using a library like jsonwebtoken
    // For example:
    // jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    //     if (err) {
    //         return res.status(403).json({
    //             success: false,
    //             message: 'Failed to authenticate token',
    //         });
    //     }
    //     req.user = decoded;
    //     next();
    // });

    next(); // For now, just call next to continue the request
};

export default verifyToken;
//
