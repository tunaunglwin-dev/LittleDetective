# Little Detective

Little Detective is a Vue + Laravel prototype for misinformation literacy. It helps students and everyday users practice checking viral claims, spotting missing context, and drafting responsible community awareness reports before sharing.

## Project Overview

- `frontend/`: Vue 3 + Vite app with login/register, dashboard, profile, claim-check modules, academy lessons, rumor report preview, and admin UI.
- `backend/`: Laravel API for authentication, Google OAuth callback handling, current-user lookup, and admin user management.
- `docker-compose.yml`: Runs the Laravel backend and Vue frontend together for demos.
- `database/` and `api/`: Project support folders kept for broader prototype assets and database/API planning.
- `docs/` and `assets/`: Documentation and presentation resources for the project.

## Main User Flow

1. Users register or log in with email, with optional Google sign-in.
2. The dashboard opens a misinformation-focused workspace.
3. Claim Check helps users review source, date, location, evidence, emotion, and confirmation signals.
4. AI Detective is a rule-based demo that highlights wording that may need verification.
5. Misinformation Academy provides short checklist lessons.
6. Rumor Watch drafts a local awareness report preview.
7. Admin users can view accounts, search users, change roles, and delete demo accounts.

## Run with Docker

```bash
docker compose up --build
```

Open the app at:

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api

Demo accounts after the backend starts and seeds the SQLite database:

- Admin: `admin@littledetective.test` / `password`
- Student: `student@littledetective.test` / `password`

The backend uses a Docker volume for `storage/app/database.sqlite`, so demo data stays between restarts. To reset all data:

```bash
docker compose down -v
docker compose up --build
```

## Local Development Without Docker

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Backend requires PHP 8.3+ and Composer:

```bash
cd backend
composer install
copy .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

Google login is optional for the prototype. Add `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `GOOGLE_REDIRECT_URI` in `backend/.env` if you want to demo OAuth.
