# LinkNest Webapp

## Services

- `frontend`: Next.js app on `http://localhost:3000`
- `backend`: Express API on `http://localhost:5000`
- `mongodb`: MongoDB on `mongodb://localhost:27017`

## Environment variables

### Backend (`backend/.env` for local non-docker runs)

```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/linknest
JWT_SECRET=replace_me
OPENAI_API_KEY=your_openai_api_key
CORS_ORIGIN=http://localhost:3000
```

### Frontend (`frontend/.env.local`)

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

## Startup

### Docker Compose (recommended)

```bash
docker compose up --build
```

To stop:

```bash
docker compose down
```

### Local development without Docker

Backend:

```bash
cd backend
npm install
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

## Tests

Backend:

```bash
cd backend
npm test
```

Frontend:

```bash
cd frontend
npm test
```

## Migration and seed steps

This project currently uses Mongoose models directly and does not include a migration framework or seed scripts yet.

Current initialization behavior:

1. On startup, backend validates database connectivity via MongoDB ping.
2. It upserts a `_healthchecks` document in collection `_healthchecks`.

If you want deterministic local data seeding, add scripts such as `backend/scripts/seed.js` and run them after `docker compose up`.
