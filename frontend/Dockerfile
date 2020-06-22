FROM node:8.10
WORKDIR /
COPY package.json yarn.lock tsconfig.json /
COPY src /src
COPY public /public
RUN yarn install && yarn build 