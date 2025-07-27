import app from "./src/app";
import { config } from "./src/config/config";

const port = config.port;





const startServer = () => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

startServer();
