# Deployment Instructions

## Your Configuration is Ready! ✅

- ✅ Cloudinary: Configured with your credentials
- ✅ MongoDB Atlas: Connected successfully  
- ✅ Server: Running locally on port 5000
- ✅ Client: Running locally on port 5173

## Deploy Backend to Railway

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Deploy Server:**
   ```bash
   cd server
   railway login
   railway init
   ```

3. **Set Environment Variables:**
   ```bash
   railway variables set CLOUDINARY_CLOUD_NAME=dqihqpz4w
   railway variables set CLOUDINARY_API_KEY=998911923297796
   railway variables set CLOUDINARY_API_SECRET=9bDE4eHBkzV9TDAJpUm0ahm9D5I
   railway variables set JWT_SECRET=supersecretjwtkey
   railway variables set SESSION_SECRET=supersessionsecretkey123456789
   railway variables set MONGODB_URI="mongodb+srv://animeadveny_db_user:63OwhHMMmK9ITUCx@cluster0.j8kogdt.mongodb.net/edunexus?retryWrites=true&w=majority&ssl=true"
   ```

4. **Deploy:**
   ```bash
   railway up
   ```

5. **Get your Railway URL** (something like `https://your-app.railway.app`)

6. **Update Frontend Environment:**
   ```bash
   # Edit client/.env.production
   VITE_API_URL=https://your-railway-url.railway.app/api
   ```

7. **Commit and Push:**
   ```bash
   git add .
   git commit -m "feat: Complete production deployment setup"
   git push origin main
   ```

## Test Your App

After deployment:
1. Visit your Vercel URL
2. Try uploading videos and documents
3. Test video playback
4. Test assignment submissions

All file upload features should now work! 🎉