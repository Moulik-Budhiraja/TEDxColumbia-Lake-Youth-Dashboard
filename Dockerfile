FROM node:lts-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

RUN npx prisma generate

RUN npm run build

CMD ["npm", "start"]
