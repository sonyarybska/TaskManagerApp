FROM node:17-alpine

MAINTAINER Some dev

RUN mkdir /app
WORKDIR /app

EXPOSE 3001

COPY ./back/package.json /app
COPY ./back/tsconfig.json /app

COPY ./back /app

RUN npm install --silent

RUN npm run build

COPY wait-for-it.sh /wait-for-it.sh

RUN chmod +x /wait-for-it.sh