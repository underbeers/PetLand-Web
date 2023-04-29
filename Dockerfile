FROM node:16-alpine as builder

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

ARG REACT_APP_CHAT_API_URL
ENV REACT_APP_CHAT_API_URL=${REACT_APP_CHAT_API_URL}

WORKDIR /app

COPY ./.nginx /app/.nginx
COPY ./public /app/public
COPY ./src /app/src
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./tsconfig.json /app/tsconfig.json
RUN echo "REACT_APP_API_URL=$REACT_APP_API_URL" > .env.production
RUN echo "\nREACT_APP_CHAT_API_URL=$REACT_APP_CHAT_API_URL" >> .env.production

RUN npm install && npm run build

FROM nginx:alpine

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 3000 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
