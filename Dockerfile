FROM node:14.4 as builder
WORKDIR /
COPY frontend/package.json frontend/yarn.lock frontend/tsconfig.json /
COPY frontend/src /src
COPY frontend/public /public
RUN yarn install && yarn build 

FROM nginx:1.19
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.dev.conf /etc/nginx/conf.d

COPY --from=builder /build /home/app/web/frontend
