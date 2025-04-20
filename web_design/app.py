from flask import Flask, request, jsonify, render_template
from db import get_db_connection
from routes import register_routes
from auth import auth_routes
from flask_cors import CORS
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)

# Load environment variables
load_dotenv()

# Register routes
register_routes(app)
auth_routes(app)

# Homepage route (for rendering index.html)
@app.route('/')
def home():
    return render_template('index.html')

# Login page route
@app.route('/login-page')
def login():
    return render_template('login.html')

if __name__ == '__main__':
    app.run(debug=True)
