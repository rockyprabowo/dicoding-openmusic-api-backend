FROM node:14-alpine as base

WORKDIR /src
COPY package*.json /src/
EXPOSE ${PORT}

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . /src/
CMD ["node", "."]

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . /src/
CMD ["nodemon"]
