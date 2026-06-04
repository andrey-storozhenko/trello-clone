import express from "express";
import { connectToMongoDb } from "./src/config/connectToMongoDb.js";
import dotenv from "dotenv";
import cors from 'cors';
import { notFoundHandler } from "./src/middleware/notFoundHandler.js"
import { logger } from "./src/middleware/logger.js"
import { errorHandler } from "./src/middleware/errorHandler.js"
import { authRoutes } from "./src/routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(logger);
app.use(express.json());
app.use(cors());

//...
app.use("/api/auth", authRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

await connectToMongoDb();

app.listen(PORT, () => {
    console.log(`Server runs on port ${PORT}`);
});