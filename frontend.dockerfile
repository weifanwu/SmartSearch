# Build stage
FROM node:14.21.3-alpine

WORKDIR /app

COPY ./frontend/ ./

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]