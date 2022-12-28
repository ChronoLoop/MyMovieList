# client build
FROM node:16 AS builder

RUN mkdir /app
COPY . /app

WORKDIR /app

RUN npm run setup
RUN npm run build

RUN mv ./client/build/ .
RUN rm -rf ./client
RUN mkdir client && mv build ./client/

EXPOSE 5000

CMD [ "npm", "run", "start:prod" ]
