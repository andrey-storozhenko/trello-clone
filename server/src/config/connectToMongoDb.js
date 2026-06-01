import mongoose from "mongoose";


export const connectToMongoDb = async () => {
    try {
        const mongoURL = process.env.MONGO_URL;

        if (!mongoURL) {
            throw new Error("MONGO_URL is not defined in .env");
        }

        await mongoose.connect(mongoURL);

        console.log("✅ Success: connected to MongoDB");
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error.message);
        process.exit(1);
    }
};