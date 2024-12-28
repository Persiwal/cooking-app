FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npx prisma generate

CMD ["/bin/sh", "-c", "npm run dev"]