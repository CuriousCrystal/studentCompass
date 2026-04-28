import requests
import json

def test_mentor_functionality():
    """Test the mentor functionality by sending a chat message to the backend"""
    
    # Test the chat endpoint
    url = "http://localhost:8001/chat/"
    payload = {
        "message": "I'm interested in becoming a software developer. What skills should I focus on?"
    }
    
    try:
        print("Testing mentor functionality...")
        response = requests.post(url, json=payload)
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Mentor response received successfully!")
            print(f"Bot message: {data.get('bot_message', 'No message')[:200]}...")
            print(f"Extracted skills: {data.get('extracted_skills', [])}")
            print(f"Updated skills: {data.get('updated_skills', '')}")
            return True
        else:
            print(f"❌ Error: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error testing mentor functionality: {str(e)}")
        return False

if __name__ == "__main__":
    test_mentor_functionality()