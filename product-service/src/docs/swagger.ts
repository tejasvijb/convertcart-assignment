import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Product Service API",
        version: "1.0.0",
        description: "This is the API documentation for the Product Service",
        contact: {
            name: "API Support",
            url: "https://convertcart-assignment.onrender.com",
        },
    },
    servers: [
        {
            url: "http://localhost:4001",
            description: "Local development server",
        },
        {
            url: "https://convertcart-product-service.onrender.com",
            description: "Production server",
        },
    ],
    tags: [
        {
            name: "Products",
            description: "API endpoints for product operations",
        },
    ],
    components: {
        schemas: {
            Product: {
                type: "object",
                properties: {
                    _id: {
                        type: "string",
                        description: "MongoDB ObjectId",
                    },
                    id: {
                        type: "integer",
                        description: "Product ID from WooCommerce",
                    },
                    name: {
                        type: "string",
                        description: "Product name",
                    },
                    slug: {
                        type: "string",
                        description: "Product slug/URL-friendly name",
                    },
                    status: {
                        type: "string",
                        description: "Product status (e.g. publish, draft)",
                    },
                    price: {
                        type: "string",
                        description: "Product price",
                    },
                    regularPrice: {
                        type: "string",
                        description: "Product regular price",
                    },
                    salePrice: {
                        type: "string",
                        description: "Product sale price",
                    },
                    totalSales: {
                        type: "integer",
                        description: "Total sales count",
                    },
                    categories: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                id: { type: "integer" },
                                name: { type: "string" },
                                slug: { type: "string" },
                            },
                        },
                        description: "Product categories",
                    },
                    tags: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                id: { type: "integer" },
                                name: { type: "string" },
                                slug: { type: "string" },
                            },
                        },
                        description: "Product tags",
                    },
                },
            },
            Error: {
                type: "object",
                properties: {
                    error: {
                        type: "string",
                        description: "Error message",
                    },
                },
            },
        },
    },
};

const options = {
    swaggerDefinition,
    apis: ["./src/routes/*.ts"], // Path to the API docs
};

export const swaggerSpec = swaggerJSDoc(options);
