FROM node:8

# Set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy over Dependencies
COPY package.json package.json
COPY package-lock.json package-lock.json

# Retriever depenencies
RUN npm install

# Copy source
COPY . .

# Build
RUN npm run build


EXPOSE 8080
CMD ["npm", "run", "prod"]
