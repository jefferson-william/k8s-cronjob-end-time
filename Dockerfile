FROM node:18.16.0-alpine

WORKDIR /app

EXPOSE 3031

COPY package*.json /app/

RUN npm install

COPY . .

CMD npm run start
