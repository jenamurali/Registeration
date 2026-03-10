from fastapi import APIRouter, Depends
from app.Models.category import CategoryResponse
from app.UnitOfWork.category import CategoryUnitOfWork
from app.Service.category import CategoryService
from app.DBConnection.DB import async_session_maker


router = APIRouter()


# Dependency Injection Providers
def get_uow() -> CategoryUnitOfWork:
    return CategoryUnitOfWork(async_session_maker)


def get_category_service(uow: CategoryUnitOfWork = Depends(get_uow)) -> CategoryService:
    return CategoryService(uow)


@router.get("/", response_model=list[CategoryResponse])
async def get_all_categories(category_service: CategoryService = Depends(get_category_service)):
    return await category_service.get_all_categories()
