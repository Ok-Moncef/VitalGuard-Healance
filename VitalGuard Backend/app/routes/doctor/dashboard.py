import logging
from flask_jwt_extended import jwt_required, get_jwt
from flask import jsonify
from ...extensions import db
from ...Models import Patient, Doctor
from geoalchemy2.shape import to_shape
from shapely.geometry import mapping
from . import doctor_bp

logger = logging.getLogger('doctor.dashboard')

@doctor_bp.route('/dashboard', methods=['GET'])
@jwt_required()
def dashboard():
    claims = get_jwt()
    user_id = claims.get('user_id')
    fullname = claims.get('fullname')
    role = claims.get('role')

    logger.info(f"Dashboard accessed by user_id={user_id}, role={role}")

    if role != 'doctor':
        logger.warning(f"Unauthorized access attempt by user_id={user_id}")
        return jsonify({"msg": "Doctors only"}), 403

    doctor = Doctor.query.filter_by(user_id=user_id).first()
    if doctor is None:
        logger.warning(f"Unapproved doctor attempted to access dashboard: user_id={user_id}")
        return jsonify({"msg": "you're not approved yet"}), 403

    patients = Patient.query.filter_by(doctor_name=fullname).all()
    logger.info(f"Found {len(patients)} patients for doctor {fullname}")

    patients_list = []
    for patient in patients:
        try:
            location = mapping(to_shape(patient.current_location)) if patient.current_location else None
            patients_list.append({
                'id': str(patient.id),
                'fullname': patient.user.fullname,
                'email': patient.user.email,
                'phone': patient.user.phone,
                'blood_type': patient.blood_type,
                'allergies': patient.allergies,
                'chronic_conditions': patient.chronic_conditions,
                'surgery_date': patient.surgery_date,
                'discharge_date': patient.discharge_date,
                'hospital_name': patient.hospital_name,
                'emergency_contact_name': patient.emergency_contact_name,
                'emergency_contact_phone': patient.emergency_contact_phone,
                'current_location': location,
                'location_updated_at': patient.location_updated_at,
                'doctor_name': patient.doctor_name,
                'heart_rate_AVG': patient.heart_rate_AVG
            })
        except Exception as e:
            logger.error(f"Error processing patient id={patient.id}: {e}", exc_info=True)

    logger.info(f"Dashboard response ready for doctor {fullname}")
    return jsonify({
        "total_patients": len(patients_list),
        'patients': patients_list
    }), 200