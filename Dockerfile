# Multi-stage build for the Venue Relationship Tracker

# Stage 1: Build the React frontend
FROM node:16-alpine as client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# Stage 2: Build the Node.js backend
FROM node:16-alpine as server-builder
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci
COPY server/ ./

# Stage 3: Production image
FROM node:16-alpine
WORKDIR /app
ENV NODE_ENV=production

# Copy server build
COPY --from=server-builder /app/server ./server

# Copy client build
COPY --from=client-builder /app/client/build ./server/public

# Set working directory to server
WORKDIR /app/server

# Expose the port the server listens on
EXPOSE 5000

# Start the server
CMD ["npm", "start"]