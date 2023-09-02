# Reference: https://dev.to/johannesvitt/deploy-a-react-app-on-gcp-with-google-cloud-run-il3
FROM node:lts-alpine as builder

WORKDIR /frontend
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build


FROM nginx:alpine

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /frontend/build /usr/share/nginx/html
EXPOSE 80

CMD nginx -g 'daemon off;'
