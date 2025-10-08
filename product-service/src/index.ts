import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import productRoutes from "./routes/productRoutes.js";
import { connectDB } from "./config/db.js";
import { initialLoadDatabase, startCron } from "./jobs/cronJob.js";
import { swaggerSpec } from "./docs/swagger.js";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: [
            "https://convertcart-assignment.onrender.com",
            "http://localhost:3000",
        ],
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        allowedHeaders: "Content-Type, Authorization",
    })
);
app.use(express.json());

// Swagger API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Route to get the OpenAPI specification in JSON format
app.get("/api-docs.json", (_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});

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
