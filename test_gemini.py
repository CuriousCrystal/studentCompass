import os
import requests

# Test the connection using REST API approach
api_key = "AIzaSyAytoNZiRTkprioNLhFVd9sUmAkn-RVyMg"

# Try a known working model from the list
try:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={api_key}"
    
    payload = {
        "contents": [{
            "parts": [{
                "text": "Hello, world!"
            }]
        }]
    }
    
    response = requests.post(
        url,
        json=payload,
        headers={"Content-Type": "application/json"}
    )
    
    if response.status_code == 200:
        result = response.json()
        if 'candidates' in result and result['candidates']:
            text = result['candidates'][0]['content']['parts'][0]['text']
            print("Success! Gemini API is working.")
            print("Response:", text)
        else:
            print("Error: No content in response")
            print("Response:", result)
    else:
        print(f"Error: {response.status_code}")
        print("Response:", response.text)
        
except Exception as e:
    print("Error connecting to Gemini API:", str(e))
    # Try another model if the first one fails
    try:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key={api_key}"
        
        payload = {
            "contents": [{
                "parts": [{
                    "text": "Hello, world!"
                }]
            }]
        }
        
        response = requests.post(
            url,
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            result = response.json()
            if 'candidates' in result and result['candidates']:
                text = result['candidates'][0]['content']['parts'][0]['text']
                print("Success with gemini-flash-latest! Gemini API is working.")
                print("Response:", text)
            else:
                print("Error: No content in response")
                print("Response:", result)
        else:
            print(f"Error with gemini-flash-latest: {response.status_code}")
            print("Response:", response.text)
            
    except Exception as e2:
        print("Error connecting to Gemini API with gemini-flash-latest:", str(e2))