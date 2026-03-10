from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.routers import users
from app.DBConnection.DB import async_engine
from app.Models.base import Base
from app.Models.user import User  # noqa: F401 - Register model with Base.metadata
from app.Models.category import Category  # noqa: F401 - Register model with Base.metadata

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables on startup
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield

app = FastAPI(lifespan=lifespan)

@app.get("/")
async def read_root():
    return {"message": "FastAPI and MySQL are connected!"}

app.include_router(users.router, prefix="/users", tags=["users"])