FROM node:18.15-alpine
RUN apk update
RUN apk add --no-cache bash
RUN apk add --no-cache git
RUN apk add --no-cache git-lfs
ENV NODE_ENV=production
WORKDIR /app
COPY package.json package-lock.json ./
RUN echo "update-notifier=false" > ./.npmrc
RUN npm ci --quiet
COPY . .
RUN chmod +x ./validate.entrypoint.sh
ENTRYPOINT ./validate.entrypoint.sh
