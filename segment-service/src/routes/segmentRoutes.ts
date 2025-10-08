import { Router } from "express";
import { evaluateRules } from "../utils/evaluateRules.js";
import { fetchProducts } from "../utils/fetchProduct.js";
import { ZodError } from "zod";

const router = Router();

/**
 * @swagger
 * /segments/evaluate:
 *   post:
 *     summary: Evaluate segment rules against products
 *     description: Evaluate given rules against products and return matching products
 *     tags: [Segments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SegmentEvaluateRequest'
 *     responses:
 *       200:
 *         description: Products matching the rules
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SegmentEvaluateResponse'
 *       400:
 *         description: Bad request, validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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
