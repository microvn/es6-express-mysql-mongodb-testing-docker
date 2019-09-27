FROM node:11.10-alpine

MAINTAINER microvnhaxor

#RUN apk add --no-cache libc6-compat

RUN apk add --no-cache make gcc g++ python

WORKDIR /home/source/service

COPY package*.json ./

RUN npm cache clean --force \
  && npm install -g node-gyp \
  && npm install

ENV NODE_ENV production
ENV WS false
ENV PORT 3333
EXPOSE 3333

CMD [ "npm", "start"]

