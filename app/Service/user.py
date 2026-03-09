from typing import List
from fastapi import HTTPException
from app.Models.user import User, UserCreate, UserUpdate
from app.UnitOfWork.user import UnitOfWork

class UserService:
    def __init__(self, uow: UnitOfWork):
        self.uow = uow

    async def create_user(self, user_data: UserCreate) -> User:
        # Start the transaction scope
        async with self.uow:
            # Business logic (e.g., check if user exists) goes here
            
            # Execute database insertion
            user = await self.uow.users.create(user_data)
            
            # Transaction commits automatically as we exit the `async with` block safely
            return user

    async def update_user(self, user_id: int, user_data: UserUpdate) -> User:
        async with self.uow:
            user = await self.uow.users.get_by_id(user_id)
            if not user:
                raise HTTPException(status_code=404, detail="User not found")
            
            # Update user data
            user.name = user_data.name
            user = await self.uow.users.update(user)
            # Transaction commits automatically as we exit the `async with` block safely
            return user
    
    async def delete_user(self, user_id: int) -> None:
        async with self.uow:
            user = await self.uow.users.get_by_id(user_id)
            if not user:
                raise HTTPException(status_code=404, detail="User not found")
            
            # Delete user
            await self.uow.users.delete(user_id)
            
            # Transaction commits automatically as we exit the `async with` block safely
    
    async def get_all_users(self) -> List[User]:
        async with self.uow:
            users = await self.uow.users.get_all()
            return users

    async def get_user_by_id(self, user_id: int) -> User:
        async with self.uow:
            user = await self.uow.users.get_by_id(user_id)
            if not user:
                raise HTTPException(status_code=404, detail="User not found")
            return user