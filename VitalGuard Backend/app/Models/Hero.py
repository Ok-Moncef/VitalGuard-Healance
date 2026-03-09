import uuid

from geoalchemy2 import Geography
from sqlalchemy import (
    CheckConstraint, Column, DateTime, ForeignKey,
    Integer, Numeric, String, text,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.extensions import db


class Hero(db.Model):
    __tablename__ = "heroes"

    id = Column(
        UUID(as_uuid=True),
        ForeignKey("doctors.user_id", ondelete="CASCADE"),
        primary_key=True,
    )
    hero_tier   = Column(String(30), default="verified_hero")
    hero_status = Column(String(20), default="offline")
    total_responses = Column(Integer,      default=0)
    average_rating  = Column(Numeric(3,2), default=0.00)
    cpd_credits     = Column(Integer,      default=0)
    standby_location = Column(Geography(geometry_type="POINT", srid=4326))
    last_online      = Column(DateTime)

    __table_args__ = (
        CheckConstraint(
            "hero_tier IN ('verified_hero','senior_hero','critical_care_hero')",
            name="chk_hero_tier",
        ),
        CheckConstraint(
            "hero_status IN ('offline','online','responding','suspended')",
            name="chk_hero_status",
        ),
    )
    doctor = relationship("Doctor", back_populates="hero")

    def __repr__(self):
        return (
            f"<Hero id={self.id} tier={self.hero_tier!r} "
            f"status={self.hero_status!r} rating={self.average_rating}>"
        )