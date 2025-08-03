

# === NASA Explorer Production Nginx Dockerfile ===

# Stage 1: Build React frontend
FROM node:20-alpine AS builder
WORKDIR /app

# Copy frontend package files
COPY ../../frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm install

# Copy frontend source and build
COPY ../../frontend/ .
RUN npm run build

# Stage 2: Nginx production image
FROM nginx:1.25-alpine

# Remove default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx config
COPY nasa-explorer.prod.conf /etc/nginx/conf.d/default.conf

# Copy frontend build to Nginx web root
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]