import axios, { AxiosError } from "axios";
import type { Product } from "../types/product.js";

export const fetchProducts = async (): Promise<Product[]> => {
    try {
        if (!process.env.PRODUCT_SERVICE_URL) {
            throw new Error(
                "PRODUCT_SERVICE_URL environment variable is not defined"
            );
        }

        const res = await axios.get(
            `${process.env.PRODUCT_SERVICE_URL}/products`,
            {
                timeout: 10000, // 10 seconds timeout
            }
        );

        return res.data;
    } catch (error) {
        const errorMessage = axios.isAxiosError(error)
            ? error.response
                ? `Service error: ${error.response.status}`
                : "Network error: Unable to reach product service"
            : `Error: ${
                  error instanceof Error ? error.message : "Unknown error"
              }`;

        throw new Error(`Failed to fetch products: ${errorMessage}`);
    }
};
