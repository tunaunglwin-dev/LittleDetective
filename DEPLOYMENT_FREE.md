# Free Deployment: Vercel + Render + Neon

This project is split into:

- `frontend/` Vue app for Vercel
- `backend/` Laravel API for Render
- Neon Postgres database

## 1. Neon Postgres

1. Create a free Neon project.
2. Copy the pooled or direct connection details.
3. Use these values on Render:
   - `DB_CONNECTION=pgsql`
   - `DB_HOST=<neon-host>`
   - `DB_PORT=5432`
   - `DB_DATABASE=<database-name>`
   - `DB_USERNAME=<username>`
   - `DB_PASSWORD=<password>`
   - `DB_SSLMODE=require`

## 2. Render Laravel API

Create a Render Web Service:

- Root directory: `backend`
- Runtime: Docker
- Health check path: `/up`

Environment variables:

```env
APP_NAME=Sone Dauk Lay
APP_ENV=production
APP_DEBUG=false
APP_KEY=<generate locally with php artisan key:generate --show>
APP_URL=https://<your-render-service>.onrender.com
FRONTEND_URL=https://<your-vercel-app>.vercel.app
CORS_ALLOWED_ORIGINS=https://<your-vercel-app>.vercel.app
ADMIN_EMAILS=admin@littledetective.test

DB_CONNECTION=pgsql
DB_HOST=<neon-host>
DB_PORT=5432
DB_DATABASE=<database-name>
DB_USERNAME=<username>
DB_PASSWORD=<password>
DB_SSLMODE=require

SESSION_DRIVER=database
QUEUE_CONNECTION=database
CACHE_STORE=database
MAIL_MAILER=log
```

After the first Render deploy succeeds, copy the Render URL and update Vercel.

## 3. Vercel Vue Frontend

Create a Vercel project:

- Root directory: `frontend`
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`

Environment variable:

```env
VITE_API_BASE_URL=https://<your-render-service>.onrender.com/api
VITE_BACKEND_URL=https://<your-render-service>.onrender.com
```

Redeploy Vercel after setting these variables.

## 4. Final Checks

- Visit `https://<your-render-service>.onrender.com/up`
- Visit your Vercel URL
- Try login with:
  - `student@littledetective.test`
  - `password`

Free hosting can sleep or pause when inactive. For a hackathon demo, open the Render backend URL first and wait for it to wake up before presenting.

## 5. Preflight Before Deploy

Run these locally before pushing:

```bash
cd frontend
npm run build

cd ../backend
php artisan config:clear
php artisan route:list
```

For Google login in production, add this redirect URI in Google Cloud OAuth:

```text
https://<your-render-service>.onrender.com/auth/google/callback
```

Then set these Render variables:

```env
GOOGLE_REDIRECT_URI=https://<your-render-service>.onrender.com/auth/google/callback
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
```
