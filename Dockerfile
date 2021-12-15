FROM nginx:latest

COPY ./build /deploy/app/build
RUN rm etc/nginx/conf.d/default.conf

EXPOSE 80
