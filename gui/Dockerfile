
FROM node:12.13 as builder

LABEL maintainer="Marko Perajica"
LABEL version="1.0"

RUN mkdir /opt/sra

WORKDIR "/opt/sra"

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn upgrade
RUN yarn install


COPY ./ ./

RUN yarn build

FROM nginx:latest
EXPOSE 3000
RUN mkdir /opt/sra

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/certs/ssl.key /opt/sra/ssl.key
COPY ./nginx/certs/ssl-cert.pem /opt/sra/ssl-cert.pem
COPY --from=builder /opt/sra/build /usr/share/nginx/html
