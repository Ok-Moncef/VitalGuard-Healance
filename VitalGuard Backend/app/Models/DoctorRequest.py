import uuid
from sqlalchemy import Column, String, DateTime, ForeignKey, Text, CheckConstraint, text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.extensions import db


class DoctorRequest(db.Model):
    __tablename__ = "doctor_requests"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )

    license_number = Column(String(100), nullable=False)
    license_country = Column(String(10), nullable=False)
    specialty = Column(String(100))
    hospital_name = Column(String(255))
    bio = Column(Text)
    status = Column(String(20), default="pending")
    created_at = Column(DateTime, server_default=text("NOW()"))
    reviewed_at = Column(DateTime)

    __table_args__ = (
        CheckConstraint(
            "status IN ('pending','approved','rejected')",
            name="chk_request_status"
        ),
    )

    user = relationship("User")