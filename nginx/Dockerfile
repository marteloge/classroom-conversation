FROM nginx

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

COPY iluweb01.it.ntnu.no.key /etc/nginx/
COPY iluweb01.it.ntnu.no.crt /etc/nginx/