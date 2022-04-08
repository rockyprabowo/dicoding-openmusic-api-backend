FROM node:14-alpine as base

ARG PORT=5000

WORKDIR /src
COPY package*.json /
EXPOSE ${PORT}

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . /
CMD ["node", "."]

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . /
CMD ["nodemon"]
