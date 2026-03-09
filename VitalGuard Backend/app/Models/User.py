import uuid
from sqlalchemy import Boolean, CheckConstraint, Column, DateTime, String, Text, text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.extensions import db


class User(db.Model):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True,
                           default=uuid.uuid4, server_default=text("uuid_generate_v4()"))
    fullname = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    phone = Column(String(30),  unique=True)
    password_hash = Column(Text,        nullable=False)
    role = Column(String(20),  nullable=False)
    is_active = Column(Boolean,     default=False)
    created_at = Column(DateTime,    server_default=text("NOW()"))

    __table_args__ = (
        CheckConstraint(
            "role IN ('patient','doctor','hero','admin')",
            name="chk_user_role",
        ),
    )

    patient = relationship("Patient", back_populates="user", uselist=False,
                           cascade="all, delete-orphan")
    doctor  = relationship("Doctor",  back_populates="user", uselist=False,
                           cascade="all, delete-orphan")

    def __repr__(self):
        return f"<User email={self.email!r} role={self.role!r}>"