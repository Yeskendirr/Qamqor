# QamQor — Charity Foundation

## Database

The project uses **SQLite** (`better-sqlite3` driver). There is no need to install a separate database server — the entire database is stored in a single file: `backend/qamqor.db`.

There is no need to connect or configure the database separately: when the backend is started for the first time, all tables (8 tables) and the `admin` account are created automatically. This logic is handled by the `initDb()` function in `backend/src/db/database.js`.

If you want to start the database from scratch, delete the `backend/qamqor.db` file. It will be recreated automatically the next time the server starts.

## Running the Project

First, start the **backend**, then start the **frontend** (in two separate terminals). Node.js 18+ must be installed.

### 1. Backend (Server)

```bash
cd backend
npm install
npm run dev
# Server: http://localhost:5002
```

### 2. Frontend (Website)

```bash
cd frontend
npm install
npm run dev
# Website: http://localhost:3000
```

`npm install` is only required the first time. After that, you can simply run `npm run dev`.

## Login

- Website: http://localhost:3000
- Admin Panel: http://localhost:3000/admin/login
  - Username: `admin`
  - Password: `admin123`

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS
- **Backend:** Node.js, Express, SQLite (`better-sqlite3`), JWT, bcrypt, multer
