import logging
from flask import Blueprint, jsonify, request
from ...Models import DoctorRequest, Doctor
from ...extensions import db
from datetime import datetime
from flask_jwt_extended import jwt_required, get_jwt

# Centralized logger for this module
logger = logging.getLogger('controllers.checkDoctors')

CheckDoc = Blueprint('CheckDoc', __name__)


@CheckDoc.route('/lst_Requested_doctors', methods=['GET'])
@jwt_required()
def get_doctors():
    claims = get_jwt()
    user_id = claims.get("user_id")
    role = claims.get("role")

    if role != "admin":
        logger.warning(f"Unauthorized access attempt by user_id={user_id} role={role}")
        return jsonify({"msg": "Admins only"}), 403

    doctors = DoctorRequest.query.all()
    doctors_list = [{
        'request_id': str(d.id),
        'user_id': str(d.user_id),
        'license_number': d.license_number,
        'license_country': d.license_country,
        'specialty': d.specialty,
        'hospital_name': d.hospital_name,
        'bio': d.bio
    } for d in doctors]

    logger.info(f"Admin user_id={user_id} retrieved list of {len(doctors_list)} doctors")
    return jsonify({"doctors": doctors_list, "total_doctors": len(doctors_list)}), 200


@CheckDoc.route('/approve_doctor', methods=['POST'])
@jwt_required()
def approve_doctor():
    claims = get_jwt()
    user_id = claims.get("user_id")
    role = claims.get("role")
    fullname = claims.get("fullname")

    if role != "admin":
        logger.warning(f"Unauthorized approve attempt by user_id={user_id} role={role}")
        return jsonify({"msg": "Admins only"}), 403

    data = request.get_json()
    doctor_id = data.get('id')

    doctor = DoctorRequest.query.filter_by(user_id=doctor_id).first()
    if doctor:
        try:
            approve_doctor = Doctor(
                user_id=doctor.user.id,
                license_number=doctor.license_number,
                license_country=doctor.license_country,
                specialty=doctor.specialty,
                hospital_name=doctor.hospital_name,
                bio=doctor.bio,
                verified_at=datetime.utcnow(),
                verified_by=fullname
            )
            db.session.add(approve_doctor)
            db.session.delete(doctor)
            db.session.commit()
            logger.info(f"Admin user_id={user_id} approved doctor_id={doctor_id}")
            return jsonify({'message': 'Doctor approved successfully'}), 200
        except Exception as e:
            db.session.rollback()
            logger.error(f"Error approving doctor_id={doctor_id} by admin user_id={user_id}: {e}", exc_info=True)
            return jsonify({'message': 'Failed to approve doctor'}), 500
    else:
        logger.error(f"Admin user_id={user_id} tried to approve non-existent doctor_id={doctor_id}")
        return jsonify({'message': 'Doctor not found'}), 404
