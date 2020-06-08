FROM nginx

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

COPY /home/local/martedl/iluweb01.it.ntnu.no.key .
COPY /home/local/martedl/iluweb01.it.ntnu.no.cer .