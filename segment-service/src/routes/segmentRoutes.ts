import { Router } from "express";
import { evaluateRules } from "../utils/evaluateRules.js";
import { fetchProducts } from "../utils/fetchProduct.js";
import { ZodError } from "zod";

const router = Router();

router.post("/evaluate", async (req, res) => {
    try {
        const { rules } = req.body; // text input

        if (!rules || typeof rules !== "string") {
            return res.status(400).json({ error: "rules must be a string" });
        }

        const products = await fetchProducts();
        const result = evaluateRules(products, rules);

        res.json({ matched: result.length, products: result });
    } catch (err: any) {
        if (err instanceof ZodError) {
            res.status(400).json({ error: err.issues });
        }

        res.status(500).json({ error: err.message });
    }
});

export default router;
