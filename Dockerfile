FROM node:14-alpine as base

WORKDIR /srv/app
COPY package*.json .
EXPOSE 5000

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
