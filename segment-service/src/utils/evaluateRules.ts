import { z } from "zod";
import type { Product } from "../types/product.js";

// Define supported operators and fields
const operators = ["=", "!=", ">", "<", ">=", "<="] as const;
const fields = ["price", "category", "stock_status", "on_sale"] as const;

// Define a schema for a single rule
const RuleSchema = z.object({
    field: z.enum(fields),
    operator: z.enum(operators),
    value: z.union([z.string(), z.number(), z.boolean()]),
});

type Rule = z.infer<typeof RuleSchema>;

/**
 * Main evaluator
 */
export const evaluateRules = (
    products: Product[],
    rulesText: string
): Product[] => {
    const rules = parseRules(rulesText);

    return products.filter((product) => {
        return rules.every((rule) => applyRule(product, rule));
    });
};

/**
 * Parse multi-line text input into validated rules
 */
function parseRules(text: string): Rule[] {
    const lines = text
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);

    return lines.map((line) => {
        const match = line.match(/^(\w+)\s*(=|!=|>|<|>=|<=)\s*(.+)$/);
        if (!match) throw new Error(`Invalid rule format: ${line}`);

        const field = match[1] as Rule["field"];
        const operator = match[2] as Rule["operator"];
        let rawValue: any = match[3]?.trim();

        // Type coercion based on field
        switch (field) {
            case "price":
                rawValue = Number(rawValue);
                if (isNaN(rawValue))
                    throw new Error(
                        `Invalid numeric value for price: ${match[3]}`
                    );
                break;

            case "on_sale":
                if (rawValue === "true" || rawValue === "false") {
                    rawValue = rawValue === "true";
                } else {
                    throw new Error(
                        `Invalid boolean value for on_sale: ${match[3]}`
                    );
                }
                break;

            case "stock_status":
                if (!["instock", "outofstock"].includes(rawValue))
                    throw new Error(`Invalid stock_status value: ${match[3]}`);
                break;

            // category remains string — no conversion
        }

        return RuleSchema.parse({ field, operator, value: rawValue });
    });
}

/**
 * Apply one rule to a product
 */
function applyRule(product: Product, rule: Rule): boolean {
    const fieldValue = (product as any)[rule.field];

    switch (rule.operator) {
        case "=":
            return fieldValue == rule.value;
        case "!=":
            return fieldValue != rule.value;
        case ">":
            return Number(fieldValue) > Number(rule.value);
        case "<":
            return Number(fieldValue) < Number(rule.value);
        case ">=":
            return Number(fieldValue) >= Number(rule.value);
        case "<=":
            return Number(fieldValue) <= Number(rule.value);
        default:
            return false;
    }
}
