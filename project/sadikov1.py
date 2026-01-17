from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Data storage file
import os
import json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Local testing
# DATA_FILE = os.path.join(BASE_DIR, "data.json")

# For Render (persistent storage)
DATA_FILE = "/data/data.json"

# Ensure the file exists online
if not os.path.exists(DATA_FILE):
    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump({
            'users': [],
            'items': [],
            'favorites': [],
            'messages': [],
            'settings': {}
        }, f, indent=2)


def save_data(data):
    """Save data to JSON file"""
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

# Authentication Routes
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    db = load_data()
    
    # Check if username already exists
    if any(u['username'] == data['username'] for u in db['users']):
        return jsonify({'error': 'Username already exists'}), 400
    
    # Create new user
    user = {
        'id': str(datetime.now().timestamp()),
        'username': data['username'],
        'name': data['name'],
        'surname': data['surname'],
        'email': data['email'],
        'birthDate': data['birthDate'],
        'age': data['age'],
        'grade': data['grade'],
        'password': data['password']  # In production, hash this!
    }
    
    db['users'].append(user)
    save_data(db)
    
    # Remove password from response
    user_response = {k: v for k, v in user.items() if k != 'password'}
    return jsonify({'user': user_response}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    db = load_data()
    
    user = next((u for u in db['users'] if u['username'] == data['username']), None)
    
    if not user or user['password'] != data['password']:
        return jsonify({'error': 'Invalid username or password'}), 401
    
    # Remove password from response
    user_response = {k: v for k, v in user.items() if k != 'password'}
    return jsonify({'user': user_response}), 200

# User Routes
@app.route('/api/user/<user_id>', methods=['GET'])
def get_user(user_id):
    db = load_data()
    user = next((u for u in db['users'] if u['id'] == user_id), None)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    user_response = {k: v for k, v in user.items() if k != 'password'}
    return jsonify({'user': user_response}), 200

@app.route('/api/user/<user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.json
    db = load_data()
    
    user_index = next((i for i, u in enumerate(db['users']) if u['id'] == user_id), None)
    
    if user_index is None:
        return jsonify({'error': 'User not found'}), 404
    
    # Update user data (don't update password or id)
    for key in ['name', 'surname', 'email', 'birthDate', 'age', 'grade']:
        if key in data:
            db['users'][user_index][key] = data[key]
    
    save_data(db)
    
    user_response = {k: v for k, v in db['users'][user_index].items() if k != 'password'}
    return jsonify({'user': user_response}), 200

# Items Routes
@app.route('/api/items', methods=['GET'])
def get_items():
    db = load_data()
    return jsonify({'items': db['items']}), 200

@app.route('/api/items', methods=['POST'])
def create_item():
    data = request.json
    db = load_data()
    
    item = {
        'id': str(datetime.now().timestamp()),
        'name': data['name'],
        'description': data['description'],
        'price': data['price'],
        'type': data['type'],
        'image': data.get('image', ''),
        'meetingRoom': data['meetingRoom'],
        'stock': data.get('stock', 0),
        'sellerId': data['sellerId'],
        'sellerUsername': data['sellerUsername'],
        'sellerEmail': data['sellerEmail'],
        'createdAt': datetime.now().isoformat()
    }
    
    db['items'].append(item)
    save_data(db)
    
    return jsonify({'item': item}), 201

@app.route('/api/items/<item_id>', methods=['PUT'])
def update_item(item_id):
    data = request.json
    db = load_data()
    
    item_index = next((i for i, item in enumerate(db['items']) if item['id'] == item_id), None)
    
    if item_index is None:
        return jsonify({'error': 'Item not found'}), 404
    
    # Update item data
    for key in ['name', 'description', 'price', 'type', 'image', 'meetingRoom', 'stock']:
        if key in data:
            db['items'][item_index][key] = data[key]
    
    save_data(db)
    
    return jsonify({'item': db['items'][item_index]}), 200

@app.route('/api/items/<item_id>', methods=['DELETE'])
def delete_item(item_id):
    db = load_data()
    
    item_index = next((i for i, item in enumerate(db['items']) if item['id'] == item_id), None)
    
    if item_index is None:
        return jsonify({'error': 'Item not found'}), 404
    
    deleted_item = db['items'].pop(item_index)
    
    # Remove from favorites
    db['favorites'] = [f for f in db['favorites'] if f['itemId'] != item_id]
    
    save_data(db)
    
    return jsonify({'message': 'Item deleted successfully'}), 200

# Favorites Routes
@app.route('/api/favorites', methods=['GET'])
def get_favorites():
    user_id = request.args.get('userId')
    if not user_id:
        return jsonify({'error': 'userId required'}), 400
    
    db = load_data()
    favorites = [f['itemId'] for f in db['favorites'] if f['userId'] == user_id]
    return jsonify({'favorites': favorites}), 200

@app.route('/api/favorites', methods=['POST'])
def toggle_favorite():
    data = request.json
    db = load_data()
    
    existing = next((f for f in db['favorites'] 
                    if f['userId'] == data['userId'] and f['itemId'] == data['itemId']), None)
    
    if existing:
        db['favorites'].remove(existing)
        is_favorite = False
    else:
        db['favorites'].append({
            'userId': data['userId'],
            'itemId': data['itemId']
        })
        is_favorite = True
    
    save_data(db)
    return jsonify({'isFavorite': is_favorite}), 200

# Messages Routes
@app.route('/api/messages', methods=['GET'])
def get_messages():
    user_id = request.args.get('userId')
    other_user_id = request.args.get('otherUserId')
    
    db = load_data()
    
    if other_user_id:
        # Get messages between two users
        messages = [m for m in db['messages'] 
                   if (m['senderId'] == user_id and m['receiverId'] == other_user_id) or
                      (m['senderId'] == other_user_id and m['receiverId'] == user_id)]
    else:
        # Get all messages for user
        messages = [m for m in db['messages'] 
                   if m['senderId'] == user_id or m['receiverId'] == user_id]
    
    return jsonify({'messages': messages}), 200

@app.route('/api/messages', methods=['POST'])
def send_message():
    data = request.json
    db = load_data()
    
    message = {
        'id': str(datetime.now().timestamp()),
        'senderId': data['senderId'],
        'senderUsername': data['senderUsername'],
        'receiverId': data['receiverId'],
        'receiverUsername': data['receiverUsername'],
        'text': data['text'],
        'timestamp': datetime.now().isoformat(),
        'read': False
    }
    
    db['messages'].append(message)
    save_data(db)
    
    return jsonify({'message': message}), 201

@app.route('/api/messages/read', methods=['PUT'])
def mark_messages_read():
    data = request.json
    db = load_data()
    
    updated = 0
    for message in db['messages']:
        if (message['receiverId'] == data['userId'] and 
            message['senderId'] == data['otherUserId'] and 
            not message['read']):
            message['read'] = True
            updated += 1
    
    if updated > 0:
        save_data(db)
    
    return jsonify({'updated': updated}), 200

# Settings Routes
@app.route('/api/settings/<user_id>', methods=['GET'])
def get_settings(user_id):
    db = load_data()
    settings = db['settings'].get(user_id, {'theme': 'dark', 'language': 'en'})
    return jsonify({'settings': settings}), 200

@app.route('/api/settings/<user_id>', methods=['PUT'])
def update_settings(user_id):
    data = request.json
    db = load_data()
    
    if user_id not in db['settings']:
        db['settings'][user_id] = {}
    
    db['settings'][user_id].update(data)
    save_data(db)
    
    return jsonify({'settings': db['settings'][user_id]}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
