import { Router } from "express";

const userRoutes = Router();

userRoutes.post("/register", (req, res, next) => {
    res.status(201).json({
        message: "User registered successfully",
    });
});

export default userRoutes;
