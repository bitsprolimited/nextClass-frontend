from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def hello():
    return jsonify({"message": "Hello, World!"})

@app.route('/health')
def health_check():
    # Return a 200 OK status if the application is healthy
    return '', 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)
