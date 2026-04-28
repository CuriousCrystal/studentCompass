# Gemini API Setup Guide

## Prerequisites

1. A Google account
2. Access to the Google AI Studio

## Getting Your Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Navigate to the "API Key" section
4. Create a new API key
5. Copy the API key

## Configuring the Application

1. Open the `.env` file in the `Generative` directory
2. Replace `your_actual_gemini_api_key_here` with your actual Gemini API key:
   ```
   GOOGLE_GENAI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

## Testing the Integration

Run the existing test file to verify the integration:
```bash
python test_gemini.py
```

If successful, you should see a response like:
```
Success! Gemini API is working.
Response: Hello! How can I help you today?
```

## Troubleshooting

If you encounter issues:

1. Ensure your API key is correct and properly formatted
2. Check that you have internet connectivity
3. Verify that the `google-generativeai` package is installed:
   ```bash
   pip install google-generativeai
   ```
4. Make sure you haven't exceeded your API quota

## Using the Mentor Feature

The application now uses Gemini API for all AI-powered features, including:
- Career path recommendations
- Personalized roadmaps
- Skill assessments
- Mock tests

All these features will automatically use the Gemini API when properly configured.