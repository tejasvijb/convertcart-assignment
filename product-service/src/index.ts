import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4001;

connectDB();

app.listen(PORT, () =>
    console.log(`🚀 Product service running on port ${PORT}`)
);
