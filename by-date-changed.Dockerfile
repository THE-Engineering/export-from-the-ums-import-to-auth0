FROM node:18.15-alpine
RUN apk update
RUN apk add --no-cache openssh
RUN apk add --no-cache curl
RUN apk add --no-cache bash
RUN apk add --no-cache git
RUN curl -fsSL https://raw.githubusercontent.com/platformsh/cli/main/installer.sh | bash
ENV NODE_ENV=production
WORKDIR /app
COPY package.json package-lock.json ./
RUN echo "update-notifier=false" > ./.npmrc
RUN npm ci --quiet
COPY . .
RUN chmod +x ./by-date-changed.entrypoint.sh
ENTRYPOINT ./by-date-changed.entrypoint.sh
