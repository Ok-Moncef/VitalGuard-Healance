import logging
from flask import Blueprint, request, jsonify
from app.ai.medguard_rag_agent import lhdra_m3a_lai

# Module-specific logger
logger = logging.getLogger('chat')

chat = Blueprint('chat', __name__)

@chat.route('/message', methods=['POST'])
def chat_with_bot():
    request_data = request.get_json()
    if not request_data or 'message' not in request_data:
        logger.warning("POST /message called with invalid payload")
        return jsonify({'error': 'Missing message field'}), 400

    user_message = request_data['message']
    logger.info(f"POST /message received: {user_message}")

    try:
        response_message = lhdra_m3a_lai(user_message)
        logger.info(f"Bot response: {response_message}")
        return jsonify({'message': response_message})
    except Exception as e:
        logger.error(f"Error processing message: {e}", exc_info=True)
        return jsonify({'error': 'Internal server error'}), 500


@chat.route('/message', methods=['GET'])
def hello():
    logger.info("GET /message called - hello world!")
    return "hello world!"