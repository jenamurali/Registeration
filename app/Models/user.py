from typing import Optional
from sqlalchemy import String, Integer, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from pydantic import BaseModel, EmailStr
from app.Models.base import Base
from app.Models.category import CategoryResponse

# SQLAlchemy Model
class User(Base):
    __tablename__ = "users"

    reg_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    unique_barcode: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    first_name: Mapped[str] = mapped_column(String(255))
    last_name: Mapped[str] = mapped_column(String(255))
    company_name: Mapped[str] = mapped_column(String(255))
    email: Mapped[str] = mapped_column(String(255), unique=True)
    mobile_no: Mapped[str] = mapped_column(String(20))
    category_id: Mapped[int] = mapped_column(Integer, ForeignKey("categories.category_id"))  # FK -> Categories table

    # Relationship to Category
    category: Mapped["Category"] = relationship(back_populates="users")
    payment_status: Mapped[bool] = mapped_column(Boolean, default=False)  # Paid/Unpaid
    payment_method: Mapped[str] = mapped_column(String(50))  # Cash, CC, Net Banking, etc.
    receipt_no: Mapped[str] = mapped_column(String(100))
    photo_url: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)


# Pydantic Schemas (DTOs)
class UserCreate(BaseModel):
    unique_barcode: str
    first_name: str
    last_name: str
    company_name: str
    email: str
    mobile_no: str
    category_id: int
    payment_status: bool = False
    payment_method: str
    receipt_no: str
    photo_url: Optional[str] = None

class UserUpdate(BaseModel):
    unique_barcode: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    company_name: Optional[str] = None
    email: Optional[str] = None
    mobile_no: Optional[str] = None
    category_id: Optional[int] = None
    payment_status: Optional[bool] = None
    payment_method: Optional[str] = None
    receipt_no: Optional[str] = None
    photo_url: Optional[str] = None

class UserResponse(BaseModel):
    reg_id: int
    unique_barcode: str
    first_name: str
    last_name: str
    company_name: str
    email: str
    mobile_no: str
    category_id: int
    category: Optional[CategoryResponse] = None
    payment_status: bool
    payment_method: str
    receipt_no: str
    photo_url: Optional[str] = None

    class Config:
        from_attributes = True