import mongoose from "mongoose";
import DB_NAME from "../constant.js";
import { config } from "dotenv.js";

const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${config.mongoUri}/${DB_NAME}`)
        console.log(`\n MONGODB connected !! DB Host ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection error", error);
        process.exit(1);
    }
}

export default connectDb;jmu,hyfff
