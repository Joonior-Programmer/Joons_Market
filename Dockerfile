FROM node:16-slim

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y openssl libssl-dev

COPY package.json ./

RUN npm i && npm i pm2 -g

COPY . .

RUN npx prisma db pull
RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD pm2 start ecosystem.config.js && pm2-runtime start ecosystem.config.js