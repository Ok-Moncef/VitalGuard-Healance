import logging
from flask import Blueprint, jsonify, request
from ...extensions import socketio

# Module-specific logger
logger = logging.getLogger('controllers.liveHeartRate')

liveHeartRate_bp = Blueprint('liveHeartRate', __name__)


@liveHeartRate_bp.route('/liveHeartRate', methods=['POST'])
def liveHeartRate():
    data = request.json
    patient_id = data.get('patient_id')
    bpm = data.get('bpm')

    if patient_id is None or bpm is None:
        logger.warning(f"Invalid liveHeartRate payload: {data}")
        return jsonify({'status': 'error', 'message': 'Missing patient_id or bpm'}), 400

    try:
        socketio.emit(f'patient_{patient_id}_hr', {'bpm': bpm})
        logger.info(f"Live heart rate emitted for patient_id={patient_id}, bpm={bpm}")
        return jsonify({'status': 'success', 'rate': bpm}), 200
    except Exception as e:
        logger.error(f"Error emitting heart rate for patient_id={patient_id}: {e}", exc_info=True)
        return jsonify({'status': 'error', 'message': 'Failed to emit heart rate'}), 500