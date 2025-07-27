import express from "express";
import globalErrorHandler from "./middleware/globalErrorHandler/globalErrorHandler";
import mainRoutes from "./router/index";
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

// moduler routing
app.use("/api/v0/", mainRoutes);

// global error handler middleware
app.use(globalErrorHandler);

export default app;
