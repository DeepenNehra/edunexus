# Google OAuth Setup Guide

## Prerequisites
- A Google account
- Your application running locally or deployed

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on "Select a project" dropdown at the top
3. Click "New Project"
4. Enter a project name (e.g., "EduNexus LMS")
5. Click "Create"

## Step 2: Enable Google+ API

1. In your project dashboard, go to "APIs & Services" > "Library"
2. Search for "Google+ API"
3. Click on it and press "Enable"

## Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Select "External" user type (unless you have a Google Workspace)
3. Click "Create"
4. Fill in the required information:
   - App name: EduNexus
   - User support email: your email
   - Developer contact email: your email
5. Click "Save and Continue"
6. Skip the "Scopes" section (click "Save and Continue")
7. Add test users if needed (for development)
8. Click "Save and Continue"

## Step 4: Create OAuth Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Select "Web application"
4. Configure:
   - Name: EduNexus Web Client
   - Authorized JavaScript origins:
     - `http://localhost:5173` (for development)
     - Your production URL (when deployed)
   - Authorized redirect URIs:
     - `http://localhost:5000/api/auth/google/callback` (for development)
     - Your production API URL + `/api/auth/google/callback` (when deployed)
5. Click "Create"
6. Copy the **Client ID** and **Client Secret**

## Step 5: Update Environment Variables

Add the following to your `server/.env` file:

```env
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
CLIENT_URL=http://localhost:5173
SESSION_SECRET=your-random-session-secret-here
```

## Step 6: Test the Integration

1. Start your backend server: `cd server && npm run dev`
2. Start your frontend: `cd client && npm run dev`
3. Navigate to the login or signup page
4. Click "Continue with Google"
5. Select your Google account
6. Grant permissions
7. You should be redirected back to your application and logged in

## Production Deployment

When deploying to production:

1. Update the OAuth consent screen with production URLs
2. Add production URLs to authorized origins and redirect URIs
3. Update environment variables with production URLs:
   ```env
   GOOGLE_CALLBACK_URL=https://your-api-domain.com/api/auth/google/callback
   CLIENT_URL=https://your-frontend-domain.com
   ```

## Troubleshooting

### "redirect_uri_mismatch" error
- Make sure the redirect URI in Google Console exactly matches your callback URL
- Check for trailing slashes
- Ensure you're using the correct protocol (http vs https)

### "Access blocked" error
- Add your email as a test user in OAuth consent screen
- Make sure the app is in "Testing" mode for development

### Session issues
- Ensure SESSION_SECRET is set in your .env file
- Check that cookies are enabled in your browser
- For production, ensure secure cookies are properly configured

## Security Notes

- Never commit your `.env` file to version control
- Use strong, random values for JWT_SECRET and SESSION_SECRET
- In production, always use HTTPS
- Regularly rotate your secrets
- Review and limit OAuth scopes to only what's necessary
