import app from "./src/app";
import { config } from "./src/config/config";
import { connectToDB } from "./src/config/DBconfig";

const port = config.port;

const startServer = async () => {
    try {
        await connectToDB();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error : unknown) {
        console.error("Failed to start the server:", error instanceof Error ? error.message : error);
        process.exit(1); // Exit the process with a failure code
    }
};

startServer();
