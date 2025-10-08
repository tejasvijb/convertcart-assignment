import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    /* config options here */
    env: {
        NEXT_PUBLIC_PRODUCT_SERVICE_URL:
            process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL,
        NEXT_PUBLIC_SEGMENT_SERVICE_URL:
            process.env.NEXT_PUBLIC_SEGMENT_SERVICE_URL,
    },
};

export default nextConfig;
