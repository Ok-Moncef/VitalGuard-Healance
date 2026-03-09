import uuid
from geoalchemy2 import Geography
from sqlalchemy import (
    Boolean, CheckConstraint, Column, DateTime,
    ForeignKey, String, Text, text,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.extensions import db

class Doctor(db.Model):
    __tablename__ = "doctors"

    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        primary_key=True,
    )
    license_number  = Column(String(100), nullable=False)
    license_country = Column(String(10),  nullable=False)
    license_status  = Column(String(20),  default="active")
    specialty       = Column(String(100))
    hospital_name   = Column(String(255))
    bio             = Column(Text)
    verified_at     = Column(DateTime)
    verified_by     = Column(String(100)) 
    current_location = Column(Geography(geometry_type="POINT", srid=4326))
    is_probationary = Column(Boolean, default=True)
    __table_args__ = (
        CheckConstraint(
            "license_status IN ('active','suspended','expired','revoked')",
            name="chk_license_status",
        ),
    )

    user = relationship("User", back_populates="doctor")
    hero = relationship("Hero", back_populates="doctor", uselist=False)

    def __repr__(self):
        return f"<Doctor license={self.license_number!r} specialty={self.specialty!r} status={self.license_status!r}>"
