FROM node:18-alpine

EXPOSE 3000

WORKDIR /app

COPY package.json package.json

RUN npm install

COPY . .

RUN npm run build

CMD [ "npx","serve","--single","dist"]