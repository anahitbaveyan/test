# Use a Node.js base image with the desired version
FROM node:14

# Set the working directory
WORKDIR /usr/src

# Copy package.json and package-lock.json
COPY package*.json ./
COPY tsconfig.json ./

# Copy the rest of the application code
COPY . .

# Build TypeScript files
RUN npm run build

# Start the application
CMD ["node", "dist/index.js"]