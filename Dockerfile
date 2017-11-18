FROM node:8

# Copy over project
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy and build dependencies
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production

# Copy and build app
COPY . .
RUN npm run build

EXPOSE 8080
CMD ["npm", "run", "prod"]
