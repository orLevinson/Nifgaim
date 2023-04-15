FROM node:18-alpine

EXPOSE 3000

WORKDIR /app

COPY package.json package.json

RUN npm install

COPY . .

ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

CMD npm run build && npx serve -s dist