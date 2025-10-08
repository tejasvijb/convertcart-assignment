# ConvertCart Frontend

A Next.js application providing a user interface for product viewing and segmentation with a custom rule engine.

## 📋 Overview

This frontend application is part of the ConvertCart ecosystem, designed to display products fetched from the product service and allow users to segment them using custom rules. Built with Next.js, TypeScript, and Tailwind CSS, it provides a responsive and intuitive user interface.

## ✨ Features

-   **Product Display**: View products with their details in a responsive grid layout
-   **Real-time Product Filtering**: Apply custom rules to filter products dynamically
-   **Custom Segment Editor**: Create segments using a simple rule syntax
-   **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
-   **Component-Based Architecture**: Modular design using React components
-   **TypeScript Support**: Full type safety throughout the application

## 🏗️ Frontend Structure

```
frontend/
├── Dockerfile              # Docker configuration for production
├── components.json         # UI component configuration
├── next.config.ts          # Next.js configuration
├── package.json            # NPM dependencies and scripts
├── public/                 # Static assets
│   ├── file.svg
│   ├── globe.svg
│   └── ...
├── src/
│   ├── app/                # Next.js app router pages
│   │   ├── layout.tsx      # Root layout component
│   │   ├── page.tsx        # Home page component
│   │   ├── globals.css     # Global styles
│   │   └── components/     # Page-specific components
│   │       ├── ProductCard.tsx
│   │       ├── SegmentEditor.tsx
│   │       └── SegmentEditorDialog.tsx
│   ├── components/         # Reusable UI components
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── dialog.tsx
│   │       └── textarea.tsx
│   ├── lib/                # Utility functions
│   │   └── utils.ts
│   └── types/              # TypeScript type definitions
│       └── product.ts
└── tsconfig.json           # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v16 or newer)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Environment Variables

Create a `.env.local` file in the frontend directory with the following variables:

```
NEXT_PUBLIC_PRODUCT_SERVICE_URL=http://localhost:3001
NEXT_PUBLIC_SEGMENT_SERVICE_URL=http://localhost:3002
```

### Installation

1. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

2. Run the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## � Docker Deployment

A Dockerfile is included for containerized deployment:

```bash
# Build the Docker image
docker build -t convertcart-frontend .

# Run the container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_PRODUCT_SERVICE_URL=http://product-service:3001 \
  -e NEXT_PUBLIC_SEGMENT_SERVICE_URL=http://segment-service:3002 \
  convertcart-frontend
```

## 📝 Segment Rule Syntax

The frontend provides a segment editor where you can write rules to filter products:

```
field operator value
```

**Supported Fields:**

-   `price` (number)
-   `category` (string)
-   `stock_status` (string: "instock" or "outofstock")
-   `on_sale` (boolean: true or false)

**Supported Operators:**

-   `=` (equals)
-   `!=` (not equals)
-   `>` (greater than)
-   `<` (less than)
-   `>=` (greater than or equal to)
-   `<=` (less than or equal to)

**Example Rules:**

```
price > 50
category = Electronics
stock_status = instock
on_sale = true
```

## � Development

### Key Components

-   **ProductCard**: Displays individual product information in a card layout
-   **SegmentEditor**: Provides an interface for writing and applying segmentation rules
-   **SegmentEditorDialog**: Modal dialog containing the segment editor

### Adding New Components

1. Create a new component in the appropriate directory
2. Import and use the component where needed
3. Add TypeScript interfaces for props

### Styling

This project uses Tailwind CSS for styling. Customize the design by:

1. Modifying the Tailwind configuration in `tailwind.config.js`
2. Adding utility classes directly in the component JSX
3. Creating component-specific styles in `globals.css` if needed
