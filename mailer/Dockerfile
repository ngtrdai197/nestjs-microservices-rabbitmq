FROM node:14-alpine

LABEL author="Dai Nguyen"

WORKDIR /mailer

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "start:dev"]