from fastapi import APIRouter, Depends, Response, status
from app.Models.user import User, UserCreate, UserUpdate, UserResponse
from app.UnitOfWork.user import UnitOfWork
from app.Service.user import UserService
from app.DBConnection.DB import async_session_maker


router = APIRouter()

# Dependency Injection Providers
def get_uow() -> UnitOfWork:
    return UnitOfWork(async_session_maker)

def get_user_service(uow: UnitOfWork = Depends(get_uow)) -> UserService:
    return UserService(uow)

@router.post("/", response_model=UserResponse)
async def create_user(user: UserCreate, user_service: UserService = Depends(get_user_service)):
    return await user_service.create_user(user)

@router.get("/", response_model=list[UserResponse])
async def read_users(user_service: UserService = Depends(get_user_service)):
    return await user_service.get_all_users()

@router.get("/{user_id}", response_model=UserResponse)
async def read_user(user_id: int, user_service: UserService = Depends(get_user_service)):
    return await user_service.get_user_by_id(user_id)

@router.put("/{user_id}", response_model=UserResponse)
async def update_user(user_id: int, user: UserUpdate, user_service: UserService = Depends(get_user_service)):
    return await user_service.update_user(user_id, user)

@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_id: int, user_service: UserService = Depends(get_user_service)):
    await user_service.delete_user(user_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)