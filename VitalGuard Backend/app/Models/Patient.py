from geoalchemy2 import Geography
from sqlalchemy import Column, Date, DateTime, ForeignKey, String, Text, text, SmallInteger
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.extensions import db


class Patient(db.Model):
    __tablename__ = "patients"

    id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        primary_key=True,
    )
    blood_type              = Column(String(5))
    allergies               = Column(Text)
    chronic_conditions      = Column(Text)
    surgery_date            = Column(Date)
    discharge_date          = Column(Date)
    hospital_name           = Column(String(255))
    emergency_contact_name  = Column(String(255))
    emergency_contact_phone = Column(String(30))
    current_location        = Column(Geography(geometry_type="POINT", srid=4326))
    location_updated_at     = Column(DateTime)
    doctor_name             = Column(String(255))
    heart_rate_AVG          = Column(SmallInteger, nullable=False)
    user = relationship("User", back_populates="patient")

    def __repr__(self):
        return f"<Patient id={self.id} hospital={self.hospital_name!r}>"