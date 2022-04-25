# OpenMusic API

OpenMusic API project submission for Backend Fundamental course on Dicoding.

## Requirements

- Node.js 14.*
- PostgreSQL >= 9.*

## Quick Start

### Docker Compose (recommended)

Run this command from your terminal/shell:

```shell
npm run keys:generate
docker compose up
```

### Native

Make sure that you have all of the requirements installed first and you have set your PostgreSQL credentials and database name on `.env` file (see [.env.defaults](.env.defaults) for an example or just copy that file to `.env` as the basis of your own configuration).

Run these command from your terminal/shell to migrate:

```shell
npm install
npn run keys:generate
npn run db:create
npm run migrate up
```

Then, run this command to start the development server:

```shell
npm run dev
```

Development server will be available to your machine via port set on PORT environment variables.
