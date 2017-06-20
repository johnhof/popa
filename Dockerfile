FROM node:8

# Copy over project
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .

# Build app
RUN npm install && \
    npm run build

EXPOSE 8080
CMD ["npm", "run", "prod"]
