from flask import Blueprint, request, jsonify
from db import db, cursor
import bcrypt

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    hashed = bcrypt.hashpw(data['password'].encode(), bcrypt.gensalt())
    cursor.execute("INSERT INTO users (name, email, phone, role, password) VALUES (%s, %s, %s, %s, %s)", 
        (data['name'], data['email'], data['phone'], data['role'], hashed))
    db.commit()
    return jsonify({"message": "User registered successfully"})

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    cursor.execute("SELECT * FROM users WHERE email = %s", (data['email'],))
    user = cursor.fetchone()
    if user and bcrypt.checkpw(data['password'].encode(), user['password'].encode()):
        return jsonify({"message": "Login successful", "user": user})
    return jsonify({"message": "Invalid credentials"}), 401
