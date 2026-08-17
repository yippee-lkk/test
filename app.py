from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
# 允許跨網域請求 (CORS)
CORS(app)

# 簡化說明：在記憶體中記錄次數 (若服務重新啟動會重置；如需持久化可改接資料庫)
global_count = 0

@app.route('/')
def home():
    return jsonify(message="電子木魚 API 運作中！")

@app.route('/api/get_count', methods=['GET'])
def get_count():
    """獲取目前功德數"""
    return jsonify(count=global_count)

@app.route('/api/click_muyu', methods=['POST'])
def click_muyu():
    """點擊敲擊木魚 +1"""
    global global_count
    global_count += 1
    return jsonify(success=True, new_count=global_count)

@app.route('/api/reset', methods=['POST'])
def reset_count():
    """重置功德數"""
    global global_count
    global_count = 0
    return jsonify(success=True, new_count=global_count)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
