import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import { connectDB } from "./config/db.js";
import { initialLoadDatabase, startCron } from "./jobs/cronJob.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);

const PORT = process.env.PORT || 4001;

// Initialize the application
const initApp = async () => {
    try {
        // Connect to the database
        await connectDB();
        
        // Load initial data from WooCommerce
        await initialLoadDatabase();
        
        // Start the cron job for regular updates
        startCron();
        
        // Start the Express server
        app.listen(PORT, () => {
            console.log(`🚀 Product service running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Application initialization failed:", error);
        process.exit(1);
    }
};

// Start the application
initApp();
