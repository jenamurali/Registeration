from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
import os

# Grab the database URL from environment variables, injected by Docker Compose
DATABASE_URL = os.getenv("DATABASE_URL", "mysql+aiomysql://user:password@db:3306/testdb")

# Setup SQLAlchemy Async Engine
async_engine = create_async_engine(DATABASE_URL)
async_session_maker = async_sessionmaker(async_engine, expire_on_commit=False)