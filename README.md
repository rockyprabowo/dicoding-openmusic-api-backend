# OpenMusic API

OpenMusic API project submission for Backend Fundamental course on Dicoding.

## Requirements

- Node.js 14.*
- PostgreSQL >= 9.*

## Quick Start

Make sure that you have all of the requirements installed first and you have set your PostgreSQL credentials and database name on `.env` file (see [.env.defaults](.env.defaults) for an example or just copy that file to `.env`).

### Docker Compose (recommended)

Run this command from your terminal/shell:

```shell
docker compose up
```

### Native

Run these command from your terminal/shell to migrate:

```shell
npm install
npn run db:create
npm run migrate up
```

Then, run this command to start the development server:

```shell
npm run dev
```
