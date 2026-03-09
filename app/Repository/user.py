from typing import Generic, TypeVar, Type
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from uuid import UUID
from app.Models.user import User, UserCreate, UserUpdate

ModelType = TypeVar("ModelType", bound=User)
CreateSchemaType = TypeVar("CreateSchemaType", bound=UserCreate)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=UserUpdate)

class AbstractRepository(Generic[ModelType, CreateSchemaType]):
    def __init__(self, model: Type, session: AsyncSession):
        self.model = model
        self.session = session

    async def create(self, obj_in: CreateSchemaType) -> ModelType:
        db_obj = self.model(**obj_in.model_dump())
        self.session.add(db_obj)
        return db_obj

    async def get_by_id(self, id: UUID) -> ModelType | None:
        result = await self.session.execute(select(self.model).filter_by(id=id))
        return result.scalars().first()

    async def get_all(self) -> list[ModelType]:
        result = await self.session.execute(select(self.model))
        return result.scalars().all()

    async def update(self, db_obj: ModelType) -> ModelType:
        merged = await self.session.merge(db_obj)
        return merged

    async def delete(self, id: UUID) -> None:
        result = await self.session.execute(select(self.model).filter_by(id=id))
        db_obj = result.scalars().first()
        if db_obj:
            await self.session.delete(db_obj)

# Concrete implementation for the User entity
class UserRepository(AbstractRepository[User, UserCreate]):
    pass