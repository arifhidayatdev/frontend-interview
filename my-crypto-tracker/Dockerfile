# Stage 1: Build the application
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve the application
FROM nginx:alpine AS production

# Copy the built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the app to be accessible
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]