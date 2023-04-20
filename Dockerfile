FROM node:18.15-alpine
RUN apk update
RUN apk add --no-cache bash
ENV NODE_ENV=production
WORKDIR /app
COPY package.json package-lock.json ./
RUN echo "update-notifier=false" > ./.npmrc
RUN npm ci --quiet
COPY . .
ENTRYPOINT npm start
