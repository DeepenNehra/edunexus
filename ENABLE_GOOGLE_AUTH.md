# How to Enable Google Authentication

## Current Status
🟡 **Google OAuth is temporarily disabled** to prevent 400 errors during development.

The button shows "(Coming Soon)" and displays a helpful message when clicked instead of redirecting to Google.

## Why It's Disabled
Without proper Google OAuth credentials configured, clicking the Google sign-in button causes a 400 error from Google's servers. To provide a better user experience, we've temporarily disabled the redirect and show a friendly message instead.

## How to Enable Google OAuth (When Ready)

### Step 1: Get Google OAuth Credentials

Follow the detailed guide in `GOOGLE_OAUTH_SETUP.md` to:
1. Create a Google Cloud Project (5 minutes)
2. Enable Google+ API (1 minute)
3. Configure OAuth consent screen (3 minutes)
4. Create OAuth credentials (2 minutes)
5. Get your Client ID and Client Secret

**Total time: ~15 minutes**

### Step 2: Update Environment Variables

Add your credentials to `server/.env`:

```env
# Replace these with your actual credentials from Google Cloud Console
GOOGLE_CLIENT_ID=your-actual-client-id-from-google.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-actual-client-secret-from-google
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
CLIENT_URL=http://localhost:5173
SESSION_SECRET=your-random-session-secret-here
```

### Step 3: Enable Google OAuth in Frontend

#### In `client/src/pages/Login.jsx`:

**Find this code (around line 38):**
```javascript
const handleGoogleLogin = () => {
  setOauthError(null)
  // Show a friendly message instead of redirecting to unconfigured OAuth
  setOauthError('Google Sign-In is currently being set up. Please use email and password to login.')
  // Uncomment below when Google OAuth is configured:
  // window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/google`
}
```

**Replace with:**
```javascript
const handleGoogleLogin = () => {
  setOauthError(null)
  // Redirect to backend Google OAuth endpoint
  window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/google`
}
```

**Also update the button (around line 75):**
```javascript
{/* Google Sign In Button */}
<button
  onClick={handleGoogleLogin}
  className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 px-4 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition transform hover:scale-[1.02]"
>
  <FcGoogle className="text-2xl" />
  Continue with Google
</button>
```

#### In `client/src/pages/Signup.jsx`:

**Find this code (around line 48):**
```javascript
const handleGoogleSignup = () => {
  setOauthError(null)
  // Show a friendly message instead of redirecting to unconfigured OAuth
  setOauthError('Google Sign-In is currently being set up. Please use email and password to create your account.')
  // Uncomment below when Google OAuth is configured:
  // window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/google`
}
```

**Replace with:**
```javascript
const handleGoogleSignup = () => {
  setOauthError(null)
  // Redirect to backend Google OAuth endpoint
  window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/google`
}
```

**Also update the button (around line 95):**
```javascript
{/* Google Sign Up Button */}
<button
  onClick={handleGoogleSignup}
  className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 px-4 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition transform hover:scale-[1.02]"
>
  <FcGoogle className="text-2xl" />
  Continue with Google
</button>
```

### Step 4: Restart Your Server

```bash
# Stop the server (Ctrl+C)
# Start it again
cd server
npm run dev
```

You should see:
```
✅ Google OAuth: Configured and Ready
```

Instead of:
```
⚠️  Google OAuth: Not Configured
```

### Step 5: Test Google OAuth

1. Go to http://localhost:5173/login
2. Click "Continue with Google"
3. You'll be redirected to Google's consent screen
4. Select your Google account
5. Grant permissions
6. You'll be redirected back and logged in automatically!

## Quick Enable (Copy-Paste Method)

If you already have Google OAuth credentials, here's the fastest way:

### 1. Update `server/.env`:
```env
GOOGLE_CLIENT_ID=paste-your-client-id-here
GOOGLE_CLIENT_SECRET=paste-your-client-secret-here
```

### 2. Update `client/src/pages/Login.jsx`:
Replace line ~38-42 with:
```javascript
const handleGoogleLogin = () => {
  setOauthError(null)
  window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/google`
}
```

Replace line ~75-81 with:
```javascript
<button
  onClick={handleGoogleLogin}
  className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 px-4 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition transform hover:scale-[1.02]"
>
  <FcGoogle className="text-2xl" />
  Continue with Google
</button>
```

### 3. Update `client/src/pages/Signup.jsx`:
Replace line ~48-52 with:
```javascript
const handleGoogleSignup = () => {
  setOauthError(null)
  window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/google`
}
```

Replace line ~95-101 with:
```javascript
<button
  onClick={handleGoogleSignup}
  className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 px-4 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition transform hover:scale-[1.02]"
>
  <FcGoogle className="text-2xl" />
  Continue with Google
</button>
```

### 4. Restart server and test!

## Current User Experience

### What Users See Now:
1. Login/Signup page with Google button showing "(Coming Soon)"
2. Button is grayed out and shows disabled state
3. Clicking shows: "Google Sign-In is currently being set up. Please use email and password."
4. Users can still use email/password authentication (fully working)

### What Users Will See After Enabling:
1. Login/Signup page with active Google button
2. Button is white with hover effects
3. Clicking redirects to Google OAuth
4. One-click sign-in with Google account
5. Automatic account creation for new users

## Benefits of Enabling Google OAuth

✅ **Better User Experience**
- One-click sign-in
- No password to remember
- Faster registration

✅ **Security**
- Google handles authentication
- No password storage for OAuth users
- Automatic profile picture

✅ **Professional**
- Industry-standard authentication
- Trusted by users
- Modern approach

## Troubleshooting

### "redirect_uri_mismatch" error
- Check that callback URL in Google Console matches exactly
- Should be: `http://localhost:5000/api/auth/google/callback`
- No trailing slash

### "Access blocked" error
- Add your email as test user in Google Console
- OAuth consent screen → Test users → Add users

### Still seeing 400 error
- Verify credentials are correct in `.env`
- Check that you uncommented the redirect code
- Restart the server after changing `.env`

### Button still shows "(Coming Soon)"
- Make sure you updated the button className
- Remove the "Coming Soon" text
- Change `bg-gray-100` to `bg-white`
- Change `cursor-not-allowed` to remove it
- Remove `opacity-75`

## Need Help?

1. **Detailed Setup:** See `GOOGLE_OAUTH_SETUP.md`
2. **Quick Start:** See `QUICK_START_GOOGLE_AUTH.md`
3. **Features:** See `AUTH_FEATURES.md`
4. **Status:** See `AUTHENTICATION_STATUS.md`

---

**Remember:** Email/password authentication works perfectly right now. Google OAuth is optional and can be enabled anytime in ~15 minutes!
