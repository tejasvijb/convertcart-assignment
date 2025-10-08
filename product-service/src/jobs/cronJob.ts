import cron from "node-cron";
import { fetchWooProducts } from "../utils/wooClient.js";
import Product from "../model/Product.js";

/**
 * Syncs products from WooCommerce to the local database.
 * This function is used both for the initial data load and by the scheduled cron job.
 */
export const syncProductsFromWoo = async (): Promise<void> => {
    try {
        console.log("🔄 Running WooCommerce products ingestion...");
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
                        tags: p.tags?.map((tag: { name: string }) => tag.name),
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
        console.error("❌ Error in WooCommerce sync:", error);
        throw error; // Re-throw to allow caller to handle the error
    }
};

/**
 * Loads the database initially with products from WooCommerce.
 * This should be called when the application starts.
 */
export const initialLoadDatabase = async (): Promise<void> => {
    console.log("🚀 Starting initial database load from WooCommerce...");
    try {
        await syncProductsFromWoo();
        console.log("✅ Initial database load completed successfully");
    } catch (error) {
        console.error("❌ Initial database load failed:", error);
        // Don't exit the process here, let the caller decide how to handle the error
        throw error;
    }
};

/**
 * Starts a cron job that syncs products from WooCommerce to the local database hourly.
 * The job fetches products from WooCommerce API and upserts them into the MongoDB database.
 */
export const startCron = () => {
    // Schedule job to run every hour at minute 0
    cron.schedule("* * * * *", async () => {
        try {
            console.log("⏰ Running scheduled hourly WooCommerce ingestion...");
            await syncProductsFromWoo();
        } catch (error) {
            console.error("❌ Error in scheduled WooCommerce sync job:", error);
        }
    });
    console.log("🕒 WooCommerce sync cron job scheduled to run hourly");
};
