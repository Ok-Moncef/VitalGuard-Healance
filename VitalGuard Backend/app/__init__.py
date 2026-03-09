from flask import Flask, jsonify
from app.config import Config
from app.extensions import db
from flask_cors import CORS
from .extensions import jwt, socketio
import logging

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)

    logging.basicConfig(
        filename='logs/app.log',      
        level=logging.INFO,            
        format='%(asctime)s [%(levelname)s] %(name)s: %(message)s'
    )
    logger = logging.getLogger('app')
    logger.info("Application startup initiated")

    db.init_app(app)
    jwt.init_app(app)
    socketio.init_app(app)

    from app.routes.chat_with_bot import chat
    from app.routes.controllers.auth import auth
    from app.routes.controllers.checkDoctors import CheckDoc
    from app.routes.controllers.liveHeartRate import liveHeartRate_bp
    from app.routes.doctor import doctor_bp

    app.register_blueprint(auth, url_prefix='/auth')
    app.register_blueprint(chat, url_prefix='/chat')
    app.register_blueprint(CheckDoc, url_prefix='/admin')
    app.register_blueprint(liveHeartRate_bp, url_prefix='/api')
    app.register_blueprint(doctor_bp, url_prefix='/doctor')

    from .Models import User, Doctor, Patient, Hero, DoctorRequest
    from .Models.Tokens import TokenBlocklist

    @jwt.user_lookup_loader
    def user_lookup_callback(_jwt_headers, jwt_data):
        identity = jwt_data["sub"]
        user = User.query.filter_by(id=identity).one_or_none()
        if user:
            logger.info(f"JWT lookup: Found user {identity}")
        else:
            logger.warning(f"JWT lookup: No user found with id {identity}")
        return user

    @jwt.additional_claims_loader
    def make_additional_claims(identity):
        claims = {"is_staff": identity == "janedoe123"}
        logger.info(f"Additional claims added for user {identity}: {claims}")
        return claims

    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_data):
        logger.warning(f"Expired token used by identity {jwt_data.get('sub')}")
        return jsonify({"message": "Token has expired", "error": "token_expired"}), 401

    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        logger.error(f"Invalid token: {error}")
        return jsonify({"message": "Signature verification failed", "error": "invalid_token"}), 401

    @jwt.unauthorized_loader
    def missing_token_callback(error):
        logger.warning(f"Missing or invalid token in request: {error}")
        return jsonify({"message": "Request doesnt contain valid token", "error": "authorization_header"}), 401

    @jwt.token_in_blocklist_loader
    def token_in_blocklist_callback(jwt_header, jwt_data):
        jti = jwt_data["jti"]
        token = db.session.query(TokenBlocklist).filter(TokenBlocklist.jti == jti).scalar()
        if token:
            logger.warning(f"Blocked token used: jti={jti}")
        return token is not None

    logger.info("Application setup completed successfully")
    return app