FROM nginx:latest

COPY ./.next /deploy/app/build
RUN rm etc/nginx/conf.d/default.conf

EXPOSE 443
