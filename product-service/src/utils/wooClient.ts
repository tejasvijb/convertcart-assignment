import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const baseURL = process.env.WOO_BASE_URL!;
const key = process.env.WOO_CONSUMER_KEY!;
const secret = process.env.WOO_CONSUMER_SECRET!;

export const fetchWooProducts = async () => {
    const url = `${baseURL}/products?consumer_key=${key}&consumer_secret=${secret}`;
    const { data } = await axios.get(url);
    return data;
};
