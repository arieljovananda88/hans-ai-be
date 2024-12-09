# Use official Node.js image as base
FROM node:18.17.1

# Set the working directory
WORKDIR /app

# Set environment variables
ENV PORT 3000
ENV MODEL_URL "https://storage.googleapis.com/bucket-mlgc-arieljovananda/model.json"

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    libatlas-base-dev \
    libblas-dev \
    liblapack-dev \
    libhdf5-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy prisma schema and generate client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy rest of the project files
COPY . .

# Expose the port
EXPOSE 3000

# Command to start the application
CMD [ "npm", "run", "start"]
