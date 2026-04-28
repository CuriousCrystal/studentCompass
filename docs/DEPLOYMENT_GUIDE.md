# MARGDARSHAN Platform Deployment Guide

## Overview
This guide provides step-by-step instructions for deploying the MARGDARSHAN Career Guidance Platform to a remote repository and production environment.

## Setting Up Remote Repository

### 1. GitHub Repository Setup
1. Go to GitHub.com and sign in to your account
2. Click the "+" icon in the top right corner and select "New repository"
3. Name your repository (e.g., "margdarshan-career-platform")
4. Choose to make it Public or Private
5. Do NOT initialize with a README (we'll push the existing code)
6. Click "Create repository"

### 2. Connect Local Repository to Remote
After creating the remote repository, connect your local repository:

```bash
cd /Users/raheedpasha/Mini_Project/Generative
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
```

Replace `YOUR_USERNAME` with your GitHub username and `YOUR_REPOSITORY_NAME` with your repository name.

### 3. Push Code to Remote Repository
```bash
git push -u origin main
```

This will push all your code, including:
- Complete frontend implementation
- Backend API services
- Documentation files
- Configuration files
- All enhancements and fixes

## Production Deployment

### 1. Frontend Deployment Options

#### Option A: Vercel (Recommended for React apps)
1. Go to vercel.com and sign up/sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`
5. Click "Deploy"

#### Option B: Netlify
1. Go to netlify.com and sign up/sign in
2. Click "New site from Git"
3. Connect to your GitHub repository
4. Configure deployment settings:
   - Build command: `npm run build`
   - Publish directory: `build`
5. Click "Deploy site"

#### Option C: Traditional Hosting
1. Build the production version:
   ```bash
   cd frontend
   npm run build
   ```
2. Upload the contents of the `build` folder to your web server

### 2. Backend Deployment Options

#### Option A: Heroku
1. Install Heroku CLI
2. Login to Heroku:
   ```bash
   heroku login
   ```
3. Create a new app:
   ```bash
   heroku create your-app-name
   ```
4. Deploy:
   ```bash
   git subtree push --prefix backend heroku main
   ```

#### Option B: DigitalOcean App Platform
1. Connect your GitHub repository
2. Set up the app with:
   - Buildpack: Python
   - Run Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Environment Variables: Add any required variables

#### Option C: AWS Elastic Beanstalk
1. Install EB CLI
2. Initialize the application:
   ```bash
   eb init
   ```
3. Create environment and deploy:
   ```bash
   eb create
   eb deploy
   ```

## Environment Variables

### Frontend Environment Variables
Create a `.env` file in the `frontend` directory:
```env
REACT_APP_GOOGLE_BOOKS_API_KEY=your_google_books_api_key
REACT_APP_BACKEND_URL=https://your-backend-url.com
```

### Backend Environment Variables
Create a `.env` file in the `backend` directory:
```env
DATABASE_URL=your_database_url
OPENAI_API_KEY=your_openai_api_key
GOOGLE_BOOKS_API_KEY=your_google_books_api_key
SECRET_KEY=your_secret_key
```

## Database Setup

### Development (SQLite)
No additional setup required - SQLite is included by default.

### Production (PostgreSQL)
1. Set up a PostgreSQL database (Heroku Postgres, AWS RDS, etc.)
2. Update the DATABASE_URL environment variable
3. Run migrations:
   ```bash
   alembic upgrade head
   ```

## CI/CD Pipeline

### GitHub Actions Workflow
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy MARGDARSHAN Platform

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
    - name: Install frontend dependencies
      run: |
        cd frontend
        npm install
    - name: Run frontend tests
      run: |
        cd frontend
        npm test -- --watchAll=false
    - name: Use Python
      uses: actions/setup-python@v2
      with:
        python-version: '3.9'
    - name: Install backend dependencies
      run: |
        cd backend
        pip install -r requirements.txt
    - name: Run backend tests
      run: |
        cd backend
        python -m pytest

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Build frontend
      run: |
        cd frontend
        npm run build
    - name: Archive production artifacts
      uses: actions/upload-artifact@v2
      with:
        name: frontend-build
        path: frontend/build

  deploy-frontend:
    needs: build
    runs-on: ubuntu-latest
    steps:
    - name: Deploy to Vercel
      run: |
        # Add your deployment script here
        echo "Deploying frontend to Vercel"

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    steps:
    - name: Deploy to Heroku
      run: |
        # Add your deployment script here
        echo "Deploying backend to Heroku"
```

## Monitoring and Analytics

### Frontend Monitoring
1. **Error Tracking**: Integrate Sentry for error monitoring
2. **Performance Monitoring**: Use Lighthouse CI for performance tracking
3. **User Analytics**: Implement Google Analytics or Plausible

### Backend Monitoring
1. **Logging**: Use structured logging with appropriate log levels
2. **Error Tracking**: Integrate Sentry for backend error monitoring
3. **Performance Monitoring**: Use tools like New Relic or DataDog

## Security Considerations

### 1. Frontend Security
- Implement Content Security Policy (CSP)
- Use HTTPS in production
- Sanitize user inputs
- Protect against XSS attacks

### 2. Backend Security
- Use environment variables for sensitive data
- Implement rate limiting
- Validate and sanitize all inputs
- Use authentication and authorization
- Keep dependencies updated

### 3. API Security
- Implement API rate limiting
- Use API keys for third-party services
- Validate request payloads
- Implement proper error handling

## Backup and Recovery

### 1. Code Backup
- Regular git commits and pushes
- Branch protection rules
- Backup repositories

### 2. Data Backup
- Regular database backups
- Automated backup scripts
- Offsite backup storage
- Recovery testing procedures

## Maintenance Procedures

### 1. Dependency Updates
```bash
# Frontend
cd frontend
npm outdated
npm update

# Backend
cd backend
pip list --outdated
pip install --upgrade -r requirements.txt
```

### 2. Performance Monitoring
- Regular performance testing
- Monitor user feedback
- Track error rates
- Review analytics data

### 3. Security Audits
- Regular security scans
- Dependency vulnerability checks
- Penetration testing
- Security updates

## Troubleshooting Common Issues

### 1. Build Failures
- Check Node.js and Python versions
- Verify all dependencies are installed
- Check environment variables
- Review build logs for specific errors

### 2. Deployment Issues
- Verify deployment credentials
- Check environment configuration
- Review deployment logs
- Ensure proper file permissions

### 3. Runtime Errors
- Check application logs
- Verify database connections
- Review environment variables
- Test API endpoints

## Support and Maintenance Contact

For ongoing support and maintenance:
- Primary Developer: [Your Name/Team]
- Email: [your-email@example.com]
- GitHub Issues: Enabled for bug reporting
- Documentation: Keep this guide updated with any changes

## Conclusion

This deployment guide provides a comprehensive approach to deploying the MARGDARSHAN Career Guidance Platform to production. Following these steps will ensure a smooth deployment process with proper monitoring, security, and maintenance procedures in place.