from flask import Flask, render_template, redirect, url_for, session, request, jsonify
from datetime import timedelta 

app = Flask(__name__)
app.secret_key = 'securemuyu'
@app.before_request
def before_request():
    if 'count' not in session:
        session['count'] = 0
@app.route('/')
def index():
    return render_template('index.html')
@app.route('/muyu')
def muyu_page():
    return render_template('page.html', current_count=session['count'])
@app.route('/click_muyu', methods=['POST'])
def click_muyu():
    session['count'] += 1
    session.modified = True 
    return jsonify(success=True, new_count=session['count'])
@app.route('/reset')
def reset_count():
    session['count'] = 0
    session.modified = True
    return redirect(url_for('muyu_page')) 
