import express from "express";
import { connectToMongoDb } from "./src/config/connectToMongoDb.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

await connectToMongoDb();

app.listen(PORT, () => {
    console.log(`Server runs on port ${PORT}`);
});