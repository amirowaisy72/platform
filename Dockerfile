# Use a base image with Node.js 24.x
FROM node:24

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of your app
COPY . .

# Build the app
RUN yarn build

# Start the app
CMD ["yarn", "start"]