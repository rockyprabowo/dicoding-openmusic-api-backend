# OpenMusic API

OpenMusic API project submission for Backend Fundamental course on Dicoding.

## Requirements

- Node.js 14.*
- yarn 1.*
- PostgreSQL >= 12.*
- Redis 6
- RabbitMQ 3

## Quick Start

### Docker Compose (recommended)

Run this command from your terminal/shell:

```shell
yarn install
yarn workspace "@openmusic/api" run keys:generate
docker compose up
```

Included services

- PostgreSQL 14
- RabbitMQ 3 with management console
- MailHog
- Redis 6

### Native

Make sure that you have all of the requirements installed first and you have set your PostgreSQL credentials and database name on `.env` file (see [.env.defaults](.env.defaults) for an example or just copy that file to `.env` as the basis of your own configuration).

Run these command from your terminal/shell to migrate:

```shell
yarn install
yarn workspace "@openmusic/api" run keys:generate
yarn workspace "@openmusic/api" run db:create
yarn workspace "@openmusic/api" run migrate up
```

Then, run this command to start the development server:

```shell
yarn run dev
```

Development server will be available on your machine via the port you've set on PORT environment variables.
