from sqlalchemy import String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from pydantic import BaseModel

class Base(DeclarativeBase): 
    pass

# SQLAlchemy Model
class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), unique=True)

# Pydantic Schemas (DTOs)
class UserCreate(BaseModel):
    name: str

class UserUpdate(BaseModel):
    name: str

class UserResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True