# Use Node.js as base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Set environment variables
ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 3001

# Command to run the app
CMD ["npm", "start"]