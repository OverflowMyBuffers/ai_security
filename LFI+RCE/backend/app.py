from flask import Flask, render_template, redirect, url_for, request, jsonify
from flask_cors import CORS
from rebuff import Rebuff
import subprocess
import re
import argparse
from langchain_experimental.pal_chain import PALChain
from langchain import OpenAI

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "https://*.proxy.runpod.net"}})

def remove_ansi_escape_codes(input_text):
    # Pattern to match ANSI escape codes
    ansi_escape = re.compile(r'\x1B\[[0-?]*[ -/]*[@-~]')
    # Replace ANSI escape codes except newline characters
    cleaned_result = ansi_escape.sub('', input_text)
    return cleaned_result

def remove_ansi_escape_codes(text):
    ansi_escape = re.compile(r'\x1B\[[0-?]*[ -/]*[@-~]')
    return ansi_escape.sub('', text)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    result = "Unable to talk to the AI agent... try again"
    # Get the 'query' parameter from the request JSON
    data = request.get_json()
    query = data.get('message') if data else None
    try:
        llm = OpenAI(temperature=0, openai_api_key=openaiapikey)
        pal_chain = PALChain.from_math_prompt(llm, verbose=True, allow_dangerous_code=True)
        result = pal_chain.run(query)
        cleaned_result = remove_ansi_escape_codes(result)
        result = cleaned_result
    except Exception as e:
        result = "I’m good at solving about the math related problems. Other stuff, not so good."
        print(e)
    return jsonify({"message": result})

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Flask application")
    # parser.add_argument('--rebuffkey', type=str, help='Redbuff API Key')
    parser.add_argument('--openaikey', type=str, help='Openai API Key')
    args = parser.parse_args()
    openaiapikey = args.openaikey
    if openaiapikey is not None:
        app.run(host="0.0.0.0", port=5005)
        app.run(debug=False)
    else:
        print("Please provide API Keys to proceed")