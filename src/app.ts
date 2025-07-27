import express from "express";
import globalErrorHandler from "./middleware/globalErrorHandler/globalErrorHandler";
import createHttpError from "http-errors";

const app = express();

// basic routing
app.get("/", (req, res, next) => {
    res.json({
        message: "Welcome to the Book Store API",
    });
});

app.post("/books", (req, res, next) => {
    res.status(201).json({
        message: "Book created successfully",
    });
});

// global error handler middleware
app.use(globalErrorHandler);

export default app;
