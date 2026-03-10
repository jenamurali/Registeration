from typing import Optional, List
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from pydantic import BaseModel
from app.Models.base import Base


# SQLAlchemy Model
class Category(Base):
    __tablename__ = "categories"

    category_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    category_name: Mapped[str] = mapped_column(String(100))  # VIP, Delegate, Crew, etc.
    allow_lunch: Mapped[bool] = mapped_column(Boolean, default=False)
    allow_dinner: Mapped[bool] = mapped_column(Boolean, default=False)
    allow_kit: Mapped[bool] = mapped_column(Boolean, default=False)
    is_printable_badge: Mapped[bool] = mapped_column(Boolean, default=False)

    # Relationship back to users
    users: Mapped[List["User"]] = relationship(back_populates="category")


# Pydantic Schemas
class CategoryCreate(BaseModel):
    category_name: str
    allow_lunch: bool = False
    allow_dinner: bool = False
    allow_kit: bool = False
    is_printable_badge: bool = False


class CategoryUpdate(BaseModel):
    category_name: Optional[str] = None
    allow_lunch: Optional[bool] = None
    allow_dinner: Optional[bool] = None
    allow_kit: Optional[bool] = None
    is_printable_badge: Optional[bool] = None


class CategoryResponse(BaseModel):
    category_id: int
    category_name: str
    allow_lunch: bool
    allow_dinner: bool
    allow_kit: bool
    is_printable_badge: bool

    class Config:
        from_attributes = True
