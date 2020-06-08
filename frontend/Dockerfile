FROM node as react-build
WORKDIR /
COPY package.json yarn.lock tsconfig.json /
COPY src /src
COPY public /public
RUN yarn install && PRODUCTION=1 yarn build 