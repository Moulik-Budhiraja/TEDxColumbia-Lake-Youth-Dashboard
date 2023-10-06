FROM node:lts-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

# RUN apk add -U tzdata

ENV TZ=${TZ:-America/Toronto}

RUN npm i -g prisma

RUN prisma generate

RUN npm run build

CMD ["npm", "start"]
