import app from "./src/app";
import config from "./src/config";

const startServer = async () => {
    const port = config.port;

    app.listen(port, () => {
        console.log(`Listening on port: ${port}`);
    });
};

startServer();
