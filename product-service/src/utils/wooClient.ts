import axios, { AxiosError } from "axios";
import dotenv from "dotenv";
dotenv.config();

// Validate environment variables
const validateEnvVariables = () => {
    const requiredVars = [
        "WOO_BASE_URL",
        "WOO_CONSUMER_KEY",
        "WOO_CONSUMER_SECRET",
    ];
    const missingVars = requiredVars.filter((varName) => !process.env[varName]);

    if (missingVars.length > 0) {
        throw new Error(
            `Missing required environment variables: ${missingVars.join(", ")}`
        );
    }
};

// Validate before using
validateEnvVariables();

const baseURL = process.env.WOO_BASE_URL as string;
const key = process.env.WOO_CONSUMER_KEY as string;
const secret = process.env.WOO_CONSUMER_SECRET as string;

export const fetchWooProducts = async () => {
    try {
        const url = `${baseURL}/products?consumer_key=${key}&consumer_secret=${secret}`;
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        // Log error details for debugging
        console.error("Error fetching WooCommerce products:", error);

        // Create a user-friendly error message
        const errorMessage = axios.isAxiosError(error)
            ? `WooCommerce API error: ${
                  error.response?.status || "Connection failed"
              }`
            : "Failed to fetch products from WooCommerce";

        throw new Error(errorMessage);
    }
};
