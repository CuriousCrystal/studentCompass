import requests
import json

# Test the chat endpoint
url = "http://localhost:8001/chat/"
payload = {
    "message": "Hello, mentor!"
}

try:
    response = requests.post(url, json=payload)
    print("Status Code:", response.status_code)
    print("Response:", response.json())
except Exception as e:
    print("Error:", str(e))