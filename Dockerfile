# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source files
COPY . .

# Expose port and start the app
EXPOSE 5000
CMD ["node", "index.js"]

