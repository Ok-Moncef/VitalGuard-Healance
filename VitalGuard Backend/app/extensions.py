import logging
from flask_bcrypt import Bcrypt
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

logger = logging.getLogger('extensions')

bcrypt = Bcrypt()
db = SQLAlchemy()
socketio = SocketIO(cors_allowed_origins="*")
jwt = JWTManager()
