import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import segmentRoutes from "./routes/segmentRoutes.js";

dotenv.config();

const app = express();
app.use(
    cors({
        origin: [
            "https://convertcart-assignment-product-service.onrender.com",
            "https://convertcart-assignment.onrender.com",
            // Keep any existing origins
            "http://localhost:3000",
            "http://localhost:4001",
        ],
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        allowedHeaders: "Content-Type, Authorization",
    })
);
app.use(express.json());

app.use("/segments", segmentRoutes);

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
