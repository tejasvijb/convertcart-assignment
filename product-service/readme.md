# Product Service

This service is responsible for fetching, storing, and serving product data from a WooCommerce store. It acts as a product data synchronization and caching service, providing a simple API endpoint to access product information.

## Features

-   **Automatic WooCommerce Synchronization**: Fetches products from WooCommerce and stores them in MongoDB
-   **Initial Data Load**: Loads product data when the service starts
-   **Scheduled Updates**: Uses a cron job to keep product data updated hourly
-   **RESTful API**: Provides a simple API to access product information

## Tech Stack

-   Node.js & TypeScript
-   Express.js
-   MongoDB with Mongoose
-   Docker for containerization
-   Node-cron for scheduled tasks

## API Endpoints

### GET /products

Retrieves all products stored in the database.

**Response:**

```json
[
  {
    "_id": "...",
    "id": 123,
    "title": "Product Name",
    "price": 19.99,
    "stock_status": "instock",
    "stock_quantity": 10,
    "category": "Category Name",
    "tags": ["tag1", "tag2"],
    "on_sale": false,
    "created_at": "2023-01-01T00:00:00"
  },
  ...
]
```

## Requirements

-   Node.js 16+ (20+ recommended)
-   MongoDB
-   WooCommerce store with API access

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3001
MONGO_URI=mongodb://username:password@localhost:27017/convertcart
WOO_BASE_URL=https://your-store.com/wp-json/wc/v3
WOO_CONSUMER_KEY=your_consumer_key
WOO_CONSUMER_SECRET=your_consumer_secret
```

## Local Development

1. Clone the repository
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create and configure the `.env` file
4. Start the development server:
    ```bash
    npm run dev
    ```

## Building and Running

### Build the Application

```bash
npm run build
```

### Run the Production Build

```bash
npm start
```

## Docker Deployment

### Building the Docker Image

```bash
docker build -t product-service .
```

### Running the Docker Container

```bash
docker run -d \
  -p 3001:3001 \
  --name product-service \
  --env-file .env \
  product-service
```

## Docker Compose Deployment

The service is designed to work with Docker Compose. Here's how to deploy the entire application stack:

1. Navigate to the root directory where the `docker-compose.yml` file is located
2. Create a `.env` file in the root directory with the required environment variables
3. Start the application:
    ```bash
    docker-compose up -d
    ```

## Docker Compose Environment Variables

When using Docker Compose, make sure to set these environment variables:

```
MONGO_USERNAME=your_mongo_username
MONGO_PASSWORD=your_mongo_password
WOO_BASE_URL=https://your-store.com/wp-json/wc/v3
WOO_CONSUMER_KEY=your_consumer_key
WOO_CONSUMER_SECRET=your_consumer_secret
```

## Cloud Deployment

### Deploying to Render

1. Create a new Web Service on Render
2. Link to your GitHub repository
3. Set the build command to `npm install && npm run build`
4. Set the start command to `npm start`
5. Add all environment variables mentioned above
6. Deploy the service

## Troubleshooting

### WooCommerce API Connection Issues

-   Verify that your WooCommerce API credentials are correct
-   Check that your store URL is accessible from the server
-   Ensure your WooCommerce API has proper permissions

### MongoDB Connection Issues

-   Verify that MongoDB is running
-   Check the connection string in the environment variables
-   Ensure the MongoDB user has proper permissions

## Data Flow

1. On startup, the service connects to MongoDB and initializes the database
2. Initial product data is loaded from WooCommerce
3. A cron job is scheduled to update product data hourly
4. The API endpoint serves product data from the MongoDB cache

## License

ISC
