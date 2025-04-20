from flask import Blueprint, request, jsonify
from db import db, cursor
import datetime

routes_bp = Blueprint('routes', __name__)

@routes_bp.route('/jobs', methods=['GET'])
def get_jobs():
    cursor.execute("SELECT * FROM jobs")
    return jsonify(cursor.fetchall())

@routes_bp.route('/jobs', methods=['POST'])
def add_job():
    data = request.json
    cursor.execute("INSERT INTO jobs (title, company, location, salary, description) VALUES (%s, %s, %s, %s, %s)", 
        (data['title'], data['company'], data['location'], data['salary'], data['description']))
    db.commit()
    return jsonify({"message": "Job added successfully"})

@routes_bp.route('/apply', methods=['POST'])
def apply():
    data = request.json
    cursor.execute("INSERT INTO applications (job_id, user_id, application_date, status) VALUES (%s, %s, %s, %s)", 
        (data['job_id'], data['user_id'], datetime.date.today(), 'Pending'))
    db.commit()
    return jsonify({"message": "Application submitted"})
