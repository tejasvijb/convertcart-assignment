import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import { connectDB } from "./config/db.js";
import { startCron } from "./jobs/cronJob.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);

const PORT = process.env.PORT || 4001;

connectDB();
startCron();

app.listen(PORT, () =>
    console.log(`🚀 Product service running on port ${PORT}`)
);
