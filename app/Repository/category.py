from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.Models.category import Category


class CategoryRepository:
    def __init__(self, model, session: AsyncSession):
        self.model = model
        self.session = session

    async def get_all(self) -> list[Category]:
        result = await self.session.execute(select(self.model))
        return result.scalars().all()
