# Segment Service

A microservice for evaluating product segment rules and filtering products based on specific criteria.

## Overview

The Segment Service is responsible for:
- Evaluating rule-based conditions against product data
- Filtering products based on these conditions
- Providing a simple query language for creating segment rules

## Features

- **Rule-Based Product Filtering**: Filter products using a simple, text-based query syntax
- **Multiple Condition Support**: Stack multiple conditions for advanced filtering
- **Field-Specific Operators**: Apply appropriate operators (=, !=, >, <, >=, <=) to different product fields
- **Type Validation**: Automatic type checking and validation for rule inputs
- **Integration with Product Service**: Fetches product data automatically from the product service

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- `.env` file with required configuration

### Environment Variables

Create a `.env` file in the project root with the following variables:

```
PORT=4002
PRODUCT_SERVICE_URL=http://localhost:4001
```

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Production Build

1. Build the TypeScript code:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```

## Docker Support

The service includes a Dockerfile for containerized deployment:

```bash
# Build the Docker image
docker build -t segment-service .

# Run the container
docker run -p 4002:4002 --env-file .env segment-service
```

## API Endpoints

### POST /segments/evaluate

Evaluates rules against all products and returns matching products.

**Request Body:**

```json
{
  "rules": "price > 50\ncategory = clothing\nstock_status = instock"
}
```

**Response:**

```json
{
  "matched": 5,
  "products": [
    {
      "id": 123,
      "title": "Premium T-shirt",
      "price": "59.99",
      "stock_status": "instock",
      "category": "clothing",
      "on_sale": false,
      "created_at": "2025-09-15T12:30:00Z"
    },
    // Additional matching products...
  ]
}
```

## Rule Syntax

Rules follow this format:
```
field operator value
```

Each rule should be on a new line. Multiple rules create an AND condition (all must match).

### Supported Fields

- `price`: Product price (numeric)
- `category`: Product category (string)
- `stock_status`: Stock status ('instock' or 'outofstock')
- `on_sale`: Whether the product is on sale (boolean: 'true' or 'false')

### Supported Operators

- `=`: Equal to
- `!=`: Not equal to
- `>`: Greater than (for numeric fields)
- `<`: Less than (for numeric fields)
- `>=`: Greater than or equal to (for numeric fields)
- `<=`: Less than or equal to (for numeric fields)

### Examples

```
price > 100
category = electronics
stock_status = instock
on_sale = true
```

## Error Handling

The service provides descriptive error messages for:
- Invalid rule syntax
- Type validation failures
- Connection issues with the product service
- Server errors

## Tech Stack

- TypeScript
- Express.js
- Zod (schema validation)
- Axios (HTTP client)
- CORS support for cross-origin requests

## License

ISC
