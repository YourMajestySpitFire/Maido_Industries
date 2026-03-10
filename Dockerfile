# Multi-stage Docker build for production on VPS
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application for production
RUN npm run build

# Stage 2: Serve the application with nginx (reverse proxy)
FROM nginx:alpine

# Copy nginx configuration
COPY nginx.vps.conf /etc/nginx/nginx.conf

# Copy built application from builder stage
COPY --from=builder /app/dist/maido_industries/browser /usr/share/nginx/html

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
