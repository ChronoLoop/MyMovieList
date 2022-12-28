FROM node:16 AS builder

RUN mkdir /app
COPY . /app

WORKDIR /app

EXPOSE 5000

RUN npm run setup
RUN npm run build
RUN rm -rf /app/client/$(!("build"))

CMD [ "npm", "run", "start:prod" ]
