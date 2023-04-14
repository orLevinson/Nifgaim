FROM node:18-alpine

EXPOSE 5000

WORKDIR /app

COPY package.json package.json

RUN npm install

COPY . .

CMD [ "node", "app.js"]