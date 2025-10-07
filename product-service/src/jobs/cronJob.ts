import cron from "node-cron";
import { fetchWooProducts } from "../utils/wooClient.js";
import Product from "../model/Product.js";

/**
 * Starts a cron job that syncs products from WooCommerce to the local database hourly.
 * The job fetches products from WooCommerce API and upserts them into the MongoDB database.
 */
export const startCron = () => {
    // Schedule job to run every hour at minute 0
    cron.schedule("* * * * *", async () => {
        try {
            console.log("🔄 Running hourly WooCommerce ingestion...");
            const startTime = Date.now();
            const products = await fetchWooProducts();
            console.log(
                `📦 Retrieved ${products.length} products from WooCommerce`
            );

            if (products.length === 0) {
                console.log("ℹ️ No products to sync");
                return;
            }

            // Prepare bulk operations
            // @ts-ignore
            const bulkOps = products.map((p) => ({
                updateOne: {
                    filter: { id: p.id },
                    update: {
                        $set: {
                            id: p.id,
                            title: p.name,
                            price: p.price,
                            stock_status: p.stock_status,
                            stock_quantity: p.stock_quantity,
                            category: p.categories?.[0]?.name,
                            tags: p.tags?.map(
                                (tag: { name: string }) => tag.name
                            ),
                            on_sale: p.on_sale,
                            created_at: p.date_created,
                            updated_at: new Date(),
                        },
                    },
                    upsert: true,
                },
            }));

            // Execute bulk operation
            const result = await Product.bulkWrite(bulkOps);
            const duration = ((Date.now() - startTime) / 1000).toFixed(2);

            console.log(`✅ Products synced successfully in ${duration}s`);
            console.log(
                `📊 Stats: ${result.upsertedCount} inserted, ${result.modifiedCount} updated, ${result.matchedCount} matched`
            );
        } catch (error) {
            console.error("❌ Error in WooCommerce sync job:", error);
        }
    });
};
