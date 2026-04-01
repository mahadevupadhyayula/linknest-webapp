# Backend (Node.js + Express)

## Local run commands

```bash
npm install
npm run dev
```

## Project structure

- `routes/`
- `controllers/`
- `models/`
- `services/`

## Environment variables

Create a `.env` file in `backend/`.

Example variables:

```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/linknest
JWT_SECRET=replace_me
OPENAI_API_KEY=your_openai_api_key
CORS_ORIGIN=http://localhost:3000
```

## Added API endpoints

- Goal onboarding
  - `POST /goals/init`
  - `POST /ai/goal-questions`
  - `POST /goals/complete`
- AI content drafting
  - `POST /ai/smart-content`
- Profile analysis
  - `POST /ai/profile-analyze`
- Engagement suggestions
  - `POST /ai/engagement-suggestions`
- Dashboard overview
  - `GET /dashboard/overview`
- Target detail and engagement logging
  - `GET /targets/:id`
  - `GET /targets/:id/engagement`
  - `POST /targets/:id/log`

All routes above require Bearer token auth.
