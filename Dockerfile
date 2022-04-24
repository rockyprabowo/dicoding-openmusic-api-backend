FROM node:14-alpine as base

WORKDIR /srv/app
ADD https://raw.githubusercontent.com/eficode/wait-for/master/wait-for /usr/local/bin/wait-for
COPY package*.json .
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh ; chmod +x /usr/local/bin/wait-for
EXPOSE 5000
ENTRYPOINT [ "docker-entrypoint.sh" ]

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . .
CMD ["node", "."]

FROM base as dev
ENV NODE_ENV=development
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]
