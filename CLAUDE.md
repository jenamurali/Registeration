# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture

This is a **conference/event registration system** with a three-tier Docker Compose deployment:

- **Backend**: FastAPI + SQLAlchemy 2.0 (async) + MySQL 8.0
- **Frontend**: React 19 + Vite + Tailwind CSS v4, served by Nginx
- **Database**: MySQL 8.0

### Backend layering (inside-out)

```
Routers (app/routers/) → Services (app/Service/) → UnitOfWork (app/UnitOfWork/) → Repositories (app/Repository/) → Models (app/Models/)
```

- **Models** define both SQLAlchemy ORM models and Pydantic DTOs (Create/Update/Response) in the same file.
- **Repositories** handle raw data access. `UserRepository` extends a generic `AbstractRepository`; `CategoryRepository` is standalone.
- **Unit of Work** wraps session lifecycle — creates a session, instantiates repositories, commits on success, rolls back on exception.
- **Services** hold business logic and orchestrate via UoW. Each endpoint gets its own `async with self.uow` block.
- **Routers** wire FastAPI paths to services via dependency injection (`Depends`).

**Key relationships**: `User.category_id` → `Category.category_id` (many-to-one, eagerly loaded via `selectinload`).

### Frontend

- React Router v7 with three routes: `/` (landing), `/registration` (list), `/user/new` and `/user/edit/:id` (form).
- `/registration` loads users paginated (10 per page) from `GET /users/?skip=&limit=`.
- API base URL is hardcoded as `http://localhost:8888` in both `Registration.jsx` and `UserForm.jsx`.

## Running the project

### Full stack (Docker)

```bash
docker-compose up
```

This starts MySQL, FastAPI (port 8888), and the frontend (port 3000). The FastAPI container waits for MySQL's healthcheck before starting.

### Backend only (local dev)

```bash
pip install -r requirements.txt
# Requires a running MySQL; set DATABASE_URL env var or use the default in DB.py
uvicorn main:app --reload --port 8000
```

The default `DATABASE_URL` is `mysql+aiomysql://user:password@db:3306/testdb` — for local dev, point it at your local MySQL instance.

### Frontend only (local dev)

```bash
cd frontend
npm install
npm run dev          # Vite dev server with HMR
npm run build        # Production build to dist/
npm run lint         # ESLint
```

The Vite dev server runs on port 5173 by default.

## Key configuration

- **Database URL**: injected via `DATABASE_URL` env var (set in `docker-compose.yml` for the `web` service, defaults in `app/DBConnection/DB.py`).
- **Frontend API URL**: hardcoded `http://localhost:8888` — change this when deploying to a different host.
- **Table creation**: auto-created on startup via `Base.metadata.create_all` in `main.py` lifespan. No migration tool (Alembic) is configured.
