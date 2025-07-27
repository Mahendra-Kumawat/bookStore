import express from "express";
import mainRoutes from "./router/index";
import globalErrorHandler from "./middleware/globalErrorHandler/globalErrorHandler";
const app = express();



// middleware
app.use(express.json());

// basic routing
app.get("/", (req, res, next) => {
    res.json({
        message: "Welcome to the Book Store API",
    });
});



// moduler routing
app.use("/api/v0/", mainRoutes);

// global error handler middleware
app.use(globalErrorHandler);

export default app;
