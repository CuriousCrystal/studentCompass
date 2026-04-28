# Student Compass

Student Compass is an AI-powered career guidance platform that helps students discover career paths, understand skill gaps, build learning roadmaps, and get personalized mentorship. The project includes a FastAPI backend and a React frontend.

## What It Does

- Analyzes student skills and expertise to recommend career paths
- Generates personalized roadmaps, courses, and certifications
- Provides an AI mentor chat experience using Google Gemini
- Suggests skills from partial input
- Supports user registration, login, and profile updates
- Includes a responsive React interface with dark/light theme support

## Tech Stack

### Backend

- Python
- FastAPI
- Uvicorn
- Pydantic
- Google Generative AI / Vertex AI
- Pytest

### Frontend

- React
- React Router
- Tailwind CSS
- Framer Motion
- Axios

## Project Structure

```text
.
|-- main.py                 # FastAPI entry point
|-- config/                 # App configuration
|-- models/                 # Pydantic schemas
|-- routes/                 # API routes
|-- services/               # Business logic and AI services
|-- tests/                  # Backend tests
|-- frontend/               # React frontend
|-- docs/                   # Additional documentation
|-- requirements.txt        # Python dependencies
|-- .env.example            # Backend environment template
`-- GEMINI_SETUP.md         # Gemini API setup instructions
```

## Requirements

- Python 3.10 or newer
- Node.js 18 or newer
- npm
- Google Gemini API key

## Backend Setup

From the project root:

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

On macOS/Linux:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Update `.env` with your API keys and settings:

```env
GOOGLE_GENAI_API_KEY=your_google_gemini_api_key_here
GOOGLE_CLOUD_PROJECT=your-project-id
SECRET_KEY=replace-with-a-strong-secret
DEBUG=true
LOG_LEVEL=INFO
ACCESS_TOKEN_EXPIRE_MINUTES=30
YOUTUBE_API_KEY=your_youtube_api_key_here
```

Start the backend:

```bash
uvicorn main:app --host 0.0.0.0 --port 8001 --reload
```

The API will be available at:

```text
http://localhost:8001
```

Interactive API docs:

```text
http://localhost:8001/docs
```

## Frontend Setup

From the project root:

```bash
cd frontend
npm install
copy env.example .env
```

On macOS/Linux:

```bash
cd frontend
npm install
cp env.example .env
```

Set the frontend API URL in `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:8001
REACT_APP_DEBUG=true
```

Start the frontend:

```bash
npm start
```

The frontend usually opens at:

```text
http://localhost:3000
```

## API Endpoints

- `GET /` - API root health response
- `GET /health` - health check
- `POST /auth/register` - register a new user
- `POST /auth/login` - log in and receive a token
- `GET /auth/me` - get current user profile
- `PUT /auth/me` - update current user profile
- `POST /analyze` - generate career recommendations
- `POST /chat/` - chat with the AI career mentor
- `POST /chat/update-skills` - update skills through chat
- `POST /ai/suggest-skills` - get skill suggestions
- `POST /ai/enhance-analysis` - run enhanced career analysis
- `GET /ai/supported-technologies` - list supported technologies and domains

## Running Tests

Backend tests:

```bash
pytest
```

Frontend tests:

```bash
cd frontend
npm test
```

Gemini smoke test:

```bash
python test_gemini.py
```

## Helpful Scripts

- `start_backend.bat`
- `frontend/start_frontend.bat`
- `frontend/start_frontend.ps1`
- `frontend/start_frontend.sh`
- `CREATE_AND_PUSH_REPO.sh`
- `PUSH_TO_GITHUB.sh`

## Additional Documentation

- `GEMINI_SETUP.md`
- `docs/AI_SETUP.md`
- `docs/AI_SETUP_INSTRUCTIONS.md`
- `docs/DEPLOYMENT_GUIDE.md`
- `docs/PROJECT_SUMMARY.md`
- `tests/README.md`

## Notes

- The backend is configured to run on port `8001`.
- AI-powered features require `GOOGLE_GENAI_API_KEY`.
- The current authentication flow uses `services/mock_user_service.py`, which is best suited for local development and testing.

