from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This allows Angular to talk to Flask


@app.route('/run-function', methods=['POST'])
def my_python_function():
    # Put your logic here
    print("Button was clicked! Running Python code...")
    return jsonify({"message": "Python function executed successfully!"})


if __name__ == '__main__':
    app.run(debug=False, port=5000)