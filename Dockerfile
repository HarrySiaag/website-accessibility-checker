FROM ghcr.io/puppeteer/puppeteer:latest

# Switch to root to install dependencies and copy files
USER root

WORKDIR /app

# Copy root configurations (if any) and package files
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Install dependencies using npm ci for deterministic builds
RUN cd backend && npm install
RUN cd frontend && npm install

# Copy source code
COPY backend ./backend/
COPY frontend ./frontend/

# Build frontend
RUN cd frontend && npm run build

# Switch back to non-root user that the puppeteer image provides for safety
USER pptruser

# Set environment variables for production
ENV NODE_ENV=production
ENV PORT=10000

EXPOSE 10000

# Start backend server
CMD ["node", "backend/index.js"]
