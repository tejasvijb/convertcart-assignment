import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4002;

const initApp = async () => {
    try {
        // Any initialization logic can go here
        // Start the Express server
        app.listen(PORT, () => {
            console.log(`🚀 Segment service running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Application initialization failed:", error);
        process.exit(1);
    }
};

initApp();
