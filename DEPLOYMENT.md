# 🚀 Deployment Guide

## Vercel Deployment (Full-Stack)

This project is configured to deploy both frontend and backend on Vercel.

### Prerequisites
- Vercel account connected to GitHub
- MongoDB Atlas cluster with IP whitelist configured
- Cloudinary account for file uploads
- Google Cloud Console OAuth credentials

### Environment Variables (Set in Vercel Dashboard)

Go to your Vercel project → Settings → Environment Variables and add:

```env
# Database
MONGODB_URI=mongodb+srv://animeadveny_db_user:63OwhHMMmK9ITUCx@cluster0.j8kogdt.mongodb.net/edunexus?retryWrites=true&w=majority

# Authentication
JWT_SECRET=supersecretjwtkey
SESSION_SECRET=supersessionsecretkey123456789

# Cloudinary (File Uploads)
CLOUDINARY_CLOUD_NAME=dqihqpz4w
CLOUDINARY_API_KEY=998911923297796
CLOUDINARY_API_SECRET=9bDE4eHBkzV9TDAJpUm0ahm9D5I

# Google OAuth
GOOGLE_CLIENT_ID=1085774083513-3vpusq73eatr2qh29hauui6egqmif1jb.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GOOGLE_CALLBACK_URL=https://your-vercel-url.vercel.app/api/auth/google/callback
CLIENT_URL=https://your-vercel-url.vercel.app

# Node Environment
NODE_ENV=production
```

### Google Cloud Console Configuration

Update your OAuth 2.0 Client in Google Cloud Console:

**Authorized JavaScript origins:**
```
https://edunexus-git-main-deepennehra-projects.vercel.app
http://localhost:5173
http://localhost:5000
```

**Authorized redirect URIs:**
```
https://edunexus-git-main-deepennehra-projects.vercel.app/api/auth/google/callback
http://localhost:5000/api/auth/google/callback
```

### MongoDB Atlas Configuration

1. Go to MongoDB Atlas → Network Access
2. Add IP Address: `0.0.0.0/0` (Allow access from anywhere)
3. This allows Vercel's dynamic IPs to connect

### Deployment Steps

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "feat: Complete production deployment setup"
   git push origin main
   ```

2. **Vercel Auto-Deploy:**
   - Vercel will automatically detect the push
   - Build and deploy both frontend and backend
   - Check deployment logs for any errors

3. **Verify Deployment:**
   - Visit your Vercel URL
   - Test login/signup with email
   - Test Google OAuth authentication
   - Test file uploads and assignments

### Troubleshooting

**404 Errors:**
- Check that `vercel.json` is properly configured
- Verify build commands in Vercel dashboard

**Google OAuth Errors:**
- Verify redirect URIs in Google Cloud Console
- Check GOOGLE_CALLBACK_URL environment variable
- Ensure CLIENT_URL is set correctly

**Database Connection Errors:**
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Check MONGODB_URI format and credentials

**File Upload Errors:**
- Verify Cloudinary credentials
- Check file size limits (currently 100MB)

### Local Development

```bash
# Install dependencies
npm install --prefix client
npm install --prefix server

# Start backend
cd server && npm start

# Start frontend (in another terminal)
cd client && npm run dev
```

Visit http://localhost:5173 for the app.

### Architecture

- **Frontend**: React + Vite (Static Build)
- **Backend**: Express.js (Vercel Serverless Functions)
- **Database**: MongoDB Atlas
- **File Storage**: Cloudinary
- **Authentication**: JWT + Google OAuth
- **Deployment**: Vercel (Full-Stack)

### Features

✅ Google OAuth Authentication
✅ Email/Password Authentication  
✅ Assignment Document Management (PDF, PNG, JPG)
✅ File Upload with Cloudinary
✅ Student Enrollment Tracking
✅ Real-time Chat (Socket.io)
✅ Live Classes Scheduling
✅ Role-based Access Control (Student, Instructor, Admin)

---

**Deployment URL:** https://edunexus-git-main-deepennehra-projects.vercel.app
**Backend API:** https://edunexus-git-main-deepennehra-projects.vercel.app/api
