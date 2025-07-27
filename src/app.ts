import express from "express";

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

export default app;
