FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate dev"]

# npx prisma migrate dev