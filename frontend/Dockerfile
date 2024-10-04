# Use node image
FROM node:14

# Set working directory
WORKDIR /usr/src/app

# Copy all files and install dependencies
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Start application
CMD ["npm", "start"]