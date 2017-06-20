FROM node:8

# Create app directory
RUN mkdir -p /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
COPY . /usr/src/app/

WORKDIR /usr/src/app
RUN npm install

EXPOSE 8080
CMD ["npm", "start"]
