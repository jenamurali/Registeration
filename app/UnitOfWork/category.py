from sqlalchemy.ext.asyncio import async_sessionmaker
from app.Repository.category import CategoryRepository
from app.Models.category import Category


class CategoryUnitOfWork:
    def __init__(self, session_factory: async_sessionmaker):
        self.session_factory = session_factory

    async def __aenter__(self):
        self.session = self.session_factory()
        self.categories = CategoryRepository(Category, self.session)
        return self

    async def __aexit__(self, exc_type, exc_val, traceback):
        if exc_type:
            await self.session.rollback()
        else:
            await self.session.commit()

        await self.session.close()
