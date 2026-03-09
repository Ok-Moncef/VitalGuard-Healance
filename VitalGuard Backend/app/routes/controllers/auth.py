import logging
import uuid
from flask import request, Blueprint, jsonify
from ...extensions import db, bcrypt
from ...Models import User, DoctorRequest
from geoalchemy2.elements import WKTElement
from flask_jwt_extended import create_access_token, create_refresh_token

# Module-specific logger
logger = logging.getLogger('auth')

auth = Blueprint('auth', __name__)


@auth.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    fullname = data.get('fullname')
    email = data.get('email')
    user_phone = data.get('phone')

    logger.info(f"Signup attempt: fullname={fullname}, email={email}")

    try:
        password = data['password']
        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        user = User(
            fullname=fullname,
            email=email,
            phone=user_phone,
            password_hash=password_hash,
            role='doctor'
        )
        db.session.add(user)
        db.session.flush()  # Get user.id before commit

        if data.get('license_number') and data.get('license_country'):
            doctor_request = DoctorRequest(
                user_id=user.id,
                license_number=data['license_number'],
                license_country=data['license_country'],
                specialty=data.get('speciality'),
                hospital_name=data.get('hospital_name'),
                bio=data.get('bio')
            )
            db.session.add(doctor_request)
        else:
            logger.warning(f"Signup failed due to missing license info: user_id={user.id}")
            return jsonify({'message': 'More data required'}), 400

        db.session.commit()
        logger.info(f"User created successfully: user_id={user.id}, fullname={fullname}")
        return jsonify({'message': 'User created successfully'}), 201

    except Exception as e:
        db.session.rollback()
        logger.error(f"Error during signup for {fullname}: {e}", exc_info=True)
        return jsonify({'message': 'Failed to create user'}), 500


@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    logger.info(f"Login attempt for email={email}")

    try:
        password = data.get('password')
        user = User.query.filter_by(email=email).first()

        if user and bcrypt.check_password_hash(user.password_hash, password):
            access_token = create_access_token(
                identity=user.id,
                additional_claims={
                    "role": user.role,
                    "user_id": user.id,
                    "fullname": user.fullname
                }
            )
            refresh_token = create_refresh_token(
                identity=user.id,
                additional_claims={
                    "role": user.role,
                    "user_id": user.id,
                    "fullname": user.fullname
                }
            )
            logger.info(f"Login successful for user_id={user.id}, email={email}")
            return jsonify({
                'message': 'Login successful',
                "token": {
                    'access_token': access_token,
                    "refresh_token": refresh_token
                }
            }), 200
        else:
            logger.warning(f"Invalid login attempt for email={email}")
            return jsonify({'message': 'Invalid email or password'}), 401

    except Exception as e:
        logger.error(f"Error during login for email={email}: {e}", exc_info=True)
        return jsonify({'message': 'Login failed due to server error'}), 500