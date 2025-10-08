import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import segmentRoutes from "./routes/segmentRoutes.js";
import { swaggerSpec } from "./docs/swagger.js";

dotenv.config();

const app = express();
app.use(
    cors({
        origin: [
            "https://convertcart-product-service.onrender.com",
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

// Swagger API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Route to get the OpenAPI specification in JSON format
app.get("/api-docs.json", (_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});

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
