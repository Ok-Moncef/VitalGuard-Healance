import logging
from flask import Blueprint

logger = logging.getLogger('doctor')

doctor_bp = Blueprint('doctor', __name__)

from . import patient_manag
from . import dashboard

logger.info("Doctor blueprint initialized and routes registered")