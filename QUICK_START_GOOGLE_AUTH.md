# Quick Start: Google OAuth Setup

## Current Status
✅ Google OAuth code is fully implemented
⚠️ Google OAuth credentials need to be configured

## Why Google Login Isn't Working Yet

The Google OAuth button will show a warning message because you need to:
1. Create a Google Cloud Project
2. Get OAuth credentials (Client ID and Secret)
3. Add them to your `.env` file

## Option 1: Set Up Google OAuth (Recommended for Production)

Follow the detailed guide in `GOOGLE_OAUTH_SETUP.md` to:
1. Create a Google Cloud Project
2. Enable Google+ API
3. Configure OAuth consent screen
4. Get your Client ID and Client Secret
5. Update your `server/.env` file

**Time required:** ~10-15 minutes

## Option 2: Use Email/Password Only (Quick Testing)

If you just want to test the app without Google OAuth:

1. The email/password login and signup work perfectly fine
2. Users will see a warning if they click "Continue with Google"
3. The warning tells them to use email/password instead

## What's Already Working

✅ **Email/Password Authentication**
- Login with email and password
- Signup with name, email, password, and role selection
- Password strength indicator
- Form validation
- Error handling

✅ **Google OAuth Integration (Code Ready)**
- Frontend buttons and UI
- Backend routes and passport configuration
- User model supports Google accounts
- Automatic user creation for new Google sign-ins
- Error handling and user feedback

## Testing the App Now

### 1. Start the Backend
```bash
cd server
npm run dev
```

### 2. Start the Frontend
```bash
cd client
npm run dev
```

### 3. Test Email/Password Auth
1. Go to http://localhost:5173
2. Click "Get Started" or "Sign up now"
3. Fill in the form with:
   - Name: Test User
   - Email: test@example.com
   - Password: Test123!
   - Role: Student
4. Accept terms and click "Create Account"
5. You'll be redirected to the dashboard

### 4. Test Google OAuth Button
1. Click "Continue with Google"
2. You'll see a warning: "Google Sign-In is not configured yet"
3. This is expected - use email/password instead

## When You're Ready for Google OAuth

1. Follow `GOOGLE_OAUTH_SETUP.md`
2. Update `server/.env` with your credentials:
   ```env
   GOOGLE_CLIENT_ID=your-actual-client-id
   GOOGLE_CLIENT_SECRET=your-actual-client-secret
   ```
3. Restart your server
4. Google login will work automatically!

## Environment Files

### server/.env (Current)
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/edunexus
JWT_SECRET=supersecretjwtkey
SESSION_SECRET=supersessionsecretkey123456789

# Google OAuth - Replace these with real values
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
CLIENT_URL=http://localhost:5173
```

### client/.env (Current)
```env
VITE_API_URL=http://localhost:5000
```

## Troubleshooting

### "Google Sign-In is not configured" warning
- **Expected behavior** - You need to add real Google OAuth credentials
- **Solution:** Follow `GOOGLE_OAUTH_SETUP.md` or use email/password

### Email/password login not working
- Check MongoDB is running: `mongod` or MongoDB Compass
- Check server is running on port 5000
- Check browser console for errors

### Server won't start
- Make sure MongoDB is running
- Check if port 5000 is available
- Run `npm install` in the server directory

## Next Steps

1. ✅ Test email/password authentication (works now)
2. ⏳ Set up Google OAuth credentials (optional, 10-15 min)
3. ✅ Start building your courses and content

## Need Help?

- Detailed Google OAuth setup: See `GOOGLE_OAUTH_SETUP.md`
- Authentication features: See `AUTH_FEATURES.md`
- General questions: Check the console logs for helpful messages
