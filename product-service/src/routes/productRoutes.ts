import { Router } from "express";
import Product from "../model/Product.js";
import type { Request, Response } from "express";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Failed to fetch products" });
    }
});

export default router;
