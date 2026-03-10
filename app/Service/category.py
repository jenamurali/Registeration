from typing import List
from app.Models.category import Category
from app.UnitOfWork.category import CategoryUnitOfWork


class CategoryService:
    def __init__(self, uow: CategoryUnitOfWork):
        self.uow = uow

    async def get_all_categories(self) -> List[Category]:
        async with self.uow:
            categories = await self.uow.categories.get_all()
            return categories
