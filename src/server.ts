import app from "./app";
import mongoose from 'mongoose';
import config from "./app/config";

async function server() {
    try {
        await mongoose.connect(config.dbUrl as string);
        console.log("Mongoose connected successfully!");

        // Start Express server
        app.listen(config.port, () => {
            console.log(`App listening on port ${config.port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

server().catch(err => console.log(err));
