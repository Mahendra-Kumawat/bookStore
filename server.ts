import app from "./src/app";

const port = process.env.PORT || 3000;

const startServer = () => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

startServer();
