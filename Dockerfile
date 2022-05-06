FROM node:14-alpine as base

WORKDIR /srv/app
EXPOSE 5000
COPY docker-entrypoint.sh /usr/local/bin/
ADD https://raw.githubusercontent.com/eficode/wait-for/501e6d97c55c7a0880de36d7147283f568b9170f/wait-for /usr/local/bin/wait-for
RUN chmod +x /usr/local/bin/docker-entrypoint.sh ; chmod +x /usr/local/bin/wait-for
COPY package.json yarn.lock ./
ENTRYPOINT [ "docker-entrypoint.sh" ]

FROM base as production
ENV NODE_ENV=production
RUN yarn install --frozen-lockfile
COPY . .
CMD ["yarn", "run", "start"]

FROM base as dev
ENV NODE_ENV=development
RUN yarn install
COPY . .
CMD ["yarn", "run", "dev"]
