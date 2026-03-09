import logging
from geoalchemy2 import WKTElement
from ...extensions import bcrypt, db
from ...Models import User, Patient, Doctor
from flask_jwt_extended import jwt_required, get_jwt
from flask import request, jsonify
from . import doctor_bp

logger = logging.getLogger('doctor.patient_manag')


@doctor_bp.route('/add_patient', methods=['POST'])
@jwt_required()
def sign_patient():
    claims = get_jwt()
    user_id = claims.get('user_id')
    fullname = claims.get('fullname')
    role = claims.get('role')

    logger.info(f"Add patient request by user_id={user_id}, role={role}")

    if role != 'doctor':
        logger.warning(f"Unauthorized add_patient attempt by user_id={user_id}")
        return jsonify({"msg": "Doctors only"}), 403

    doctor = Doctor.query.filter_by(user_id=user_id).first()
    if doctor is None:
        logger.warning(f"Unapproved doctor tried to add patient: user_id={user_id}")
        return jsonify({"msg": "you're not approved yet"}), 403

    data = request.get_json()
    try:
        password_hash = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        user = User(
            fullname=data['fullname'],
            email=data['email'],
            phone=data['phone'],
            password_hash=password_hash,
            role='patient'
        )
        db.session.add(user)
        db.session.flush()  

        longitude = data['current_location']['lon']
        latitude = data['current_location']['lat']
        current_location = WKTElement(f'POINT({longitude} {latitude})', srid=4326)

        patient = Patient(
            id=user.id,
            blood_type=data['blood_type'],
            allergies=data['allergies'],
            chronic_conditions=data['chronic_conditions'],
            surgery_date=data['surgery_date'],
            discharge_date=data['discharge_date'],
            hospital_name=data['hospital_name'],
            doctor_name=fullname,
            emergency_contact_name=data['emergency_contact_name'],
            emergency_contact_phone=data['emergency_contact_phone'],
            current_location=current_location
        )

        db.session.add(patient)
        db.session.commit()

        logger.info(f"Patient added successfully: patient_id={user.id}, doctor={fullname}")
        return jsonify({'message': 'Patient signed up successfully'}), 200

    except Exception as e:
        db.session.rollback()
        logger.error(f"Error adding patient by doctor {fullname}: {e}", exc_info=True)
        return jsonify({'message': 'Failed to add patient'}), 500


@doctor_bp.route('/remove_patient', methods=['POST'])
@jwt_required()
def remove_patient():
    claims = get_jwt()
    user_id = claims.get('user_id')
    fullname = claims.get('fullname')
    role = claims.get('role')

    logger.info(f"Remove patient request by user_id={user_id}, role={role}")

    if role != 'doctor':
        logger.warning(f"Unauthorized remove_patient attempt by user_id={user_id}")
        return jsonify({"msg": "Doctors only"}), 403

    doctor = Doctor.query.filter_by(user_id=user_id).first()
    if doctor is None:
        logger.warning(f"Unapproved doctor tried to remove patient: user_id={user_id}")
        return jsonify({"msg": "you're not approved yet"}), 403

    data = request.get_json()
    patient_id = data.get('id')

    try:
        patient = Patient.query.filter_by(id=patient_id).first()
        if patient:
            db.session.delete(patient)
            db.session.commit()
            logger.info(f"Patient removed successfully: patient_id={patient_id}, doctor={fullname}")
            return jsonify({'message': 'Patient removed successfully'}), 200
        else:
            logger.warning(f"Remove patient failed - patient not found: patient_id={patient_id}")
            return jsonify({'message': 'Patient not found'}), 404

    except Exception as e:
        db.session.rollback()
        logger.error(f"Error removing patient id={patient_id} by doctor {fullname}: {e}", exc_info=True)
        return jsonify({'message': 'Failed to remove patient'}), 500