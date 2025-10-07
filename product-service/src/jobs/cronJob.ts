import cron from "node-cron";
import { fetchWooProducts } from "../utils/wooClient.js";
import Product from "../model/Product.js";

export const startCron = () => {
    cron.schedule("0 * * * *", async () => {
        console.log("🔄 Running hourly WooCommerce ingestion...");
        const products = await fetchWooProducts();

        for (const p of products) {
            await Product.findOneAndUpdate(
                { id: p.id },
                {
                    id: p.id,
                    title: p.name,
                    price: p.price,
                    stock_status: p.stock_status,
                    stock_quantity: p.stock_quantity,
                    category: p.categories?.[0]?.name,
                    tags: p.tags?.map((t: any) => t.name),
                    on_sale: p.on_sale,
                    created_at: p.date_created,
                },
                { upsert: true }
            );
        }

        console.log("✅ Products synced");
    });
};
