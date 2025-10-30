# EduNexus - Quick Start Guide 🚀

## Prerequisites
- Node.js 18+ installed
- MongoDB running (local or Atlas)
- Git installed

---

## 🏃‍♂️ Quick Setup (5 minutes)

### Step 1: Start MongoDB (if using local)
```bash
# Windows
mongod

# Mac/Linux
sudo systemctl start mongod
```

### Step 2: Setup Backend
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
copy env.example .env    # Windows
cp env.example .env      # Mac/Linux

# Edit .env with your settings
# Minimum required:
# PORT=5000
# MONGODB_URI=mongodb://127.0.0.1:27017/edunexus
# JWT_SECRET=your-secret-key-here

# Start server
npm run dev
```

Server will run on `http://localhost:5000`

### Step 3: Setup Frontend
```bash
# Open new terminal
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173`

---

## 🎯 First Time Setup

### Create Admin Account
1. Go to `http://localhost:5173`
2. Click "Sign Up"
3. Fill in details:
   - Name: Admin User
   - Email: admin@example.com
   - Password: Admin@123
   - Role: Select "Instructor" (then manually change to admin in DB)

### Change Role to Admin (MongoDB)
```bash
# Open MongoDB shell
mongosh

# Use the database
use edunexus

# Update user role
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

### Create Test Accounts
**Instructor:**
- Email: instructor@example.com
- Password: Instructor@123
- Role: Instructor

**Student:**
- Email: student@example.com
- Password: Student@123
- Role: Student

---

## 🎨 Explore Features

### As Admin
1. Login with admin account
2. View dashboard statistics
3. Navigate to "Admin" → "Manage Users"
4. Try editing user roles
5. View all courses

### As Instructor
1. Login with instructor account
2. Click "Create Course" from dashboard
3. Add course details:
   - Title: "Introduction to Web Development"
   - Description: "Learn HTML, CSS, and JavaScript"
4. Click "Manage Course" on the course card
5. Add a lecture:
   - Title: "Getting Started"
   - Description: "Introduction to the course"
   - Video URL: https://www.youtube.com/watch?v=dQw4w9WgXcQ
6. Add an assignment:
   - Title: "Build a Landing Page"
   - Description: "Create a responsive landing page"
   - Due Date: Select a future date
7. Schedule a live class:
   - Title: "Q&A Session"
   - Scheduled Date: Select a future date/time
   - Meeting Link: https://zoom.us/j/123456789
   - Platform: Zoom

### As Student
1. Login with student account
2. Browse courses
3. Enroll in a course
4. Watch lectures
5. Submit assignments
6. Join chat
7. View scheduled live classes

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Backend (Port 5000)
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9

# Frontend (Port 5173)
# Change port in vite.config.js or kill process
```

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- For Atlas, ensure IP whitelist is configured

### CORS Errors
- Ensure backend is running on port 5000
- Check VITE_API_URL in client/.env (if created)
- Default: http://localhost:5000/api

### Cloudinary Not Working
- Cloudinary is optional
- Use direct video URLs instead
- Or configure Cloudinary credentials in .env

---

## 📦 Production Build

### Backend
```bash
cd server
npm install --production
npm start
```

### Frontend
```bash
cd client
npm run build
# Output in dist/ folder
```

---

## 🚀 Deployment

### Backend (Render)
1. Push to GitHub
2. Create Web Service on Render
3. Connect repository
4. Set build command: `cd server && npm install`
5. Set start command: `cd server && npm start`
6. Add environment variables

### Frontend (Vercel)
1. Push to GitHub
2. Import project in Vercel
3. Set root directory: `client`
4. Build command: `npm run build`
5. Output directory: `dist`
6. Add VITE_API_URL environment variable

---

## 🎓 Learning Path

### For Beginners
1. Start as a student
2. Explore the interface
3. Enroll in courses
4. Watch lectures and submit assignments

### For Content Creators
1. Create instructor account
2. Build your first course
3. Add lectures and assignments
4. Schedule live classes
5. Engage with students via chat

### For Administrators
1. Understand platform statistics
2. Manage user roles
3. Monitor content quality
4. Handle user issues

---

## 📚 Additional Resources

- **README.md**: Comprehensive documentation
- **ENHANCEMENTS.md**: Detailed feature list
- **API Documentation**: See README for all endpoints
- **Tech Stack**: MERN (MongoDB, Express, React, Node.js)

---

## 💡 Tips

1. **Use Chrome DevTools**: Inspect network requests and console logs
2. **Check Terminal Logs**: Both frontend and backend terminals show useful info
3. **MongoDB Compass**: Use GUI to view database contents
4. **Postman**: Test API endpoints directly
5. **Redux DevTools**: Install browser extension to debug state

---

## 🎉 You're Ready!

Your EduNexus LMS is now up and running. Enjoy exploring all the features!

For issues or questions, check the troubleshooting section or review the main README.md.

Happy Learning! 🎓
