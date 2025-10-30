# EduNexus — Mini LMS 🎓

A **comprehensive Learning Management System** built with the MERN stack (MongoDB, Express, React, Node.js). This modern LMS platform enables instructors to create and manage courses, upload video lectures and assignments, while students can enroll, access content, submit assignments, and participate in real-time discussions. Admins have complete oversight of the platform.

## � LHacktoberfest 2025

[![Hacktoberfest 2025](https://img.shields.io/badge/Hacktoberfest-2025-orange.svg)](https://hacktoberfest.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![First Timers Only](https://img.shields.io/badge/first--timers--only-friendly-blue.svg)](https://www.firsttimersonly.com/)

**EduNexus is participating in Hacktoberfest 2025!** 🎉

We welcome contributions from developers of all skill levels. Whether you're a seasoned developer or just starting your open-source journey, there's something for everyone!

### 🚀 Quick Start for Contributors
1. ⭐ Star this repository
2. 🍴 Fork the project
3. 📋 Check out our [Contributing Guidelines](CONTRIBUTING.md)
4. 🔍 Browse [Issues](https://github.com/DeepenNehra/edunexus/issues) labeled with `hacktoberfest`
5. 💻 Make your contribution
6. 🎯 Submit a Pull Request

### 🏷️ Contribution Areas
- 🐛 **Bug Fixes** - Help us squash bugs
- ✨ **New Features** - Add exciting functionality
- 📚 **Documentation** - Improve our docs
- 🎨 **UI/UX** - Enhance user experience
- 🧪 **Testing** - Increase test coverage
- ⚡ **Performance** - Optimize the application

## 🌟 Live Demo

🔗 **[Live Application](https://your-app-url.vercel.app)** *(Update with your deployed URL)*

📂 **[GitHub Repository](https://github.com/DeepenNehra/edunexus)**

## 📋 Project Overview

**Duration**: 1 Week Development Sprint  
**Objective**: Build a mini Learning Management System with role-based access and real-time features  
**Architecture**: Full-stack MERN application with Socket.io integration

## 👥 User Roles & Capabilities

### 🎓 **Student**
- ✅ Register/Login with email and password
- ✅ Browse and view available courses
- ✅ Enroll in courses with one-click
- ✅ Watch uploaded video lectures
- ✅ Submit assignments with file uploads
- ✅ Participate in course-specific chat/discussions
- ✅ Track enrollment and progress

### 👨‍🏫 **Instructor**
- ✅ Register/Login with instructor role
- ✅ Create, update, and delete courses
- ✅ Upload video lectures for courses
- ✅ Create and manage assignments
- ✅ View and review student submissions
- ✅ Participate in course discussions
- ✅ Manage course enrollment

### 👨‍💼 **Admin**
- ✅ Complete user management (CRUD operations)
- ✅ Manage all courses across the platform
- ✅ View all uploaded content and submissions
- ✅ Remove inappropriate content/users
- ✅ Platform oversight and moderation

## � lCore Features (MVP)

### 1. **Authentication & Authorization**
- ✅ JWT-based secure login/signup system
- ✅ Role-based access control (Admin/Instructor/Student)
- ✅ Protected routes and API endpoints
- ✅ Persistent authentication with localStorage

### 2. **Course Management**
- ✅ Instructors can create, edit, delete courses
- ✅ Students can view and enroll in available courses
- ✅ Course details with instructor information
- ✅ Enrollment tracking and management

### 3. **Video Lectures**
- ✅ Upload and manage lecture videos
- ✅ HTML5 video player with controls
- ✅ Course-organized lecture structure
- ✅ Support for multiple video formats

### 4. **Assignment System**
- ✅ Instructors create assignments with due dates
- ✅ File upload support for assignments
- ✅ Students submit assignments with attachments
- ✅ Submission tracking and management

### 5. **Real-time Chat System**
- ✅ Socket.io-powered real-time messaging
- ✅ Course-specific chat rooms
- ✅ Persistent message history
- ✅ Real-time participant updates

## 🎁 Bonus Features

### 📅 **Live Class Scheduling**
- ✅ Instructors can schedule live sessions
- ✅ Date/time management for classes
- ✅ Integration ready for Zoom/Google Meet/Teams
- ✅ Student participation tracking

## 🎨 **Modern UI/UX**
- ✅ Beautiful gradient-based design system
- ✅ Fully responsive layouts (mobile, tablet, desktop)
- ✅ Professional landing page with hero section
- ✅ Intuitive navigation and user flows
- ✅ Loading states and smooth animations
- ✅ Role-specific dashboards and interfaces

## 📋 Tech Stack

**Backend:**
- Node.js & Express
- MongoDB (Mongoose)
- JWT for authentication
- Multer for file uploads
- Cloudinary for video/file storage
- Socket.io for real-time communication

**Frontend:**
- React (Vite)
- React Router for navigation
- Redux Toolkit for state management
- TailwindCSS for styling
- Socket.io-client for real-time chat
- Axios for API calls

## 🛠️ Local Development Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **MongoDB** - Choose one option:
  - [MongoDB Community Server](https://www.mongodb.com/try/download/community) (local installation)
  - [MongoDB Atlas](https://www.mongodb.com/atlas) (cloud database - free tier available)
- **Git** - [Download here](https://git-scm.com/)
- **(Optional)** [Cloudinary Account](https://cloudinary.com/) - For file/video uploads

### 🚀 Quick Start (5 minutes)

1. **Clone the repository**
   ```bash
   git clone https://github.com/DeepenNehra/edunexus.git
   cd edunexus
   ```

2. **Set up Backend**
   ```bash
   cd server
   npm install
   
   # Copy environment file
   cp env.example .env
   
   # Start MongoDB (if using local installation)
   # Windows: net start MongoDB
   # macOS: brew services start mongodb-community
   # Linux: sudo systemctl start mongod
   
   # Start backend server
   npm run dev
   ```

3. **Set up Frontend** (in a new terminal)
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - API Health Check: http://localhost:5000/api/health

### ⚙️ Detailed Configuration

#### Backend Environment Variables

Edit `server/.env` file:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://127.0.0.1:27017/edunexus
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/edunexus

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
SESSION_SECRET=your-session-secret-key-for-oauth

# File Upload (Optional - Cloudinary)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
CLIENT_URL=http://localhost:5173
```

#### Frontend Environment Variables

Create `client/.env` file:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api
```

### 🗄️ Database Setup Options

#### Option 1: Local MongoDB
```bash
# Install MongoDB Community Server
# Windows: Download installer from mongodb.com
# macOS: brew install mongodb-community
# Ubuntu: sudo apt install mongodb

# Start MongoDB service
# Windows: net start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod

# Verify MongoDB is running
# Connect to: mongodb://127.0.0.1:27017
```

#### Option 2: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### 🧪 Verify Installation

1. **Check Backend**
   ```bash
   curl http://localhost:5000/api/health
   # Should return: {"status":"OK","message":"Server is running"}
   ```

2. **Check Frontend**
   - Visit http://localhost:5173
   - You should see the EduNexus landing page

3. **Test Database Connection**
   - Backend logs should show: "✓ Connected to MongoDB"
   - No connection errors in console

### 🔧 Development Scripts

#### Backend (`server/` directory)
```bash
npm run dev          # Start development server with nodemon
npm start           # Start production server
npm test            # Run tests (when available)
npm run lint        # Run ESLint (when configured)
```

#### Frontend (`client/` directory)
```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm test            # Run tests (when available)
npm run lint        # Run ESLint (when configured)
```

### 🐛 Troubleshooting

#### Common Issues

**Port already in use:**
```bash
# Kill process on port 5000 (backend)
# Windows: netstat -ano | findstr :5000
# macOS/Linux: lsof -ti:5000 | xargs kill -9

# Kill process on port 5173 (frontend)
# Windows: netstat -ano | findstr :5173
# macOS/Linux: lsof -ti:5173 | xargs kill -9
```

**MongoDB connection failed:**
```bash
# Check if MongoDB is running
# Windows: sc query MongoDB
# macOS: brew services list | grep mongodb
# Linux: sudo systemctl status mongod

# Check connection string in .env file
# Ensure database name is correct
```

**Module not found errors:**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**CORS errors:**
- Ensure `CLIENT_URL` in backend `.env` matches frontend URL
- Check that both servers are running

#### Getting Help

- 📖 Check our [Contributing Guide](CONTRIBUTING.md)
- 🐛 [Create an issue](https://github.com/DeepenNehra/edunexus/issues) for bugs
- 💬 Use [GitHub Discussions](https://github.com/DeepenNehra/edunexus/discussions) for questions
- 📧 Contact maintainers for urgent issues

## 🧪 Demo Credentials

Create accounts through the signup page or use these test credentials:

### Test Accounts
| Role | Email | Password | Access Level |
|------|-------|----------|--------------|
| **Student** | student@edunexus.com | Student123! | Course enrollment, lectures, assignments, chat |
| **Instructor** | instructor@edunexus.com | Instructor123! | Course creation, content management, submissions |
| **Admin** | admin@edunexus.com | Admin123! | Full platform management, user control |

### Creating New Accounts
1. Visit the signup page
2. Choose your role (Student/Instructor)
3. Fill in required information
4. Start using the platform immediately

## 📁 Project Structure

```
.
├── server/                 # Backend (Express API)
│   ├── src/
│   │   ├── models/        # Mongoose models
│   │   ├── controllers/    # Route controllers
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth middleware
│   │   ├── config/         # Cloudinary config
│   │   ├── app.js          # Express app setup
│   │   └── server.js        # Server entry point
│   └── package.json
│
├── client/                 # Frontend (React)
│   ├── src/
│   │   ├── features/       # Redux slices
│   │   ├── pages/          # Page components
│   │   ├── components/     # Reusable components
│   │   ├── lib/            # API client
│   │   ├── store.js        # Redux store
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   └── package.json
│
└── README.md
```

## 🌐 API Documentation

### Authentication Endpoints
```
POST /api/auth/signup          # User registration
POST /api/auth/login           # User login
GET  /api/auth/google          # Google OAuth (optional)
```

### Course Management
```
GET    /api/courses            # List all courses (public)
GET    /api/courses/:id        # Get course details
POST   /api/courses            # Create course (Instructor/Admin)
PUT    /api/courses/:id        # Update course (Instructor/Admin)
DELETE /api/courses/:id        # Delete course (Instructor/Admin)
POST   /api/courses/:id/enroll # Enroll in course (Student)
```

### Lecture Management
```
GET  /api/courses/:courseId/lectures     # List course lectures
POST /api/courses/:courseId/lectures     # Upload lecture (Instructor/Admin)
GET  /api/courses/:courseId/lectures/:id # Get specific lecture
PUT  /api/courses/:courseId/lectures/:id # Update lecture (Instructor/Admin)
DELETE /api/courses/:courseId/lectures/:id # Delete lecture (Instructor/Admin)
```

### Assignment System
```
GET  /api/courses/:courseId/assignments              # List assignments
POST /api/courses/:courseId/assignments              # Create assignment (Instructor/Admin)
POST /api/courses/:courseId/assignments/:id/submit   # Submit assignment (Student)
GET  /api/courses/:courseId/assignments/:id/submissions # View submissions (Instructor/Admin)
```

### Real-time Chat
```
GET /api/courses/:courseId/chat          # Get chat history
WebSocket: /socket.io                    # Real-time messaging
Events: join-course, send-message, new-message
```

### Live Classes (Bonus)
```
GET    /api/courses/:courseId/liveclasses     # List live classes
POST   /api/courses/:courseId/liveclasses     # Schedule class (Instructor/Admin)
PUT    /api/courses/:courseId/liveclasses/:id # Update class (Instructor/Admin)
DELETE /api/courses/:courseId/liveclasses/:id # Delete class (Instructor/Admin)
```

### Admin Panel
```
GET    /api/admin/users        # List all users
GET    /api/admin/users/:id    # Get user details
PUT    /api/admin/users/:id    # Update user
DELETE /api/admin/users/:id    # Delete user
```

## 🚢 Deployment Guide

### 📦 **Backend Deployment (Render/Railway)**

1. **Prepare Repository**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Render**
   - Create new Web Service
   - Connect GitHub repository
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

3. **Environment Variables**
   ```env
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/edunexus
   JWT_SECRET=your-super-secure-jwt-secret-for-production
   CLOUDINARY_CLOUD_NAME=your-cloudinary-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

### 🌐 **Frontend Deployment (Vercel/Netlify)**

1. **Deploy on Vercel**
   - Import project from GitHub
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

2. **Environment Variables**
   ```env
   VITE_API_URL=https://your-backend-url.render.com/api
   ```

3. **Build Settings**
   - Framework Preset: Vite
   - Node.js Version: 18.x

### 🔧 **Post-Deployment Checklist**
- [ ] Backend health check: `GET /api/health`
- [ ] Frontend loads correctly
- [ ] Authentication works
- [ ] File uploads functional (if using Cloudinary)
- [ ] Real-time chat operational
- [ ] All user roles accessible

## 📸 Screenshots & Features

### 🏠 **Landing Page**
- Modern gradient hero section
- Feature highlights and statistics
- Call-to-action for registration
- Responsive design for all devices

### 🎓 **Student Experience**
- **Course Discovery**: Browse courses with beautiful card layouts
- **Enrollment**: One-click course enrollment system
- **Video Learning**: HTML5 video player with progress tracking
- **Assignment Submission**: Drag-and-drop file upload interface
- **Real-time Chat**: Course-specific discussion rooms
- **Dashboard**: Personal learning progress overview

### 👨‍🏫 **Instructor Tools**
- **Course Creation**: Intuitive course setup wizard
- **Content Management**: Upload lectures and create assignments
- **Student Analytics**: View enrollment and engagement metrics
- **Submission Review**: Grade and provide feedback on assignments
- **Live Class Scheduling**: Calendar integration for class planning

### 👨‍💼 **Admin Panel**
- **User Management**: Complete CRUD operations with role assignment
- **Platform Overview**: Real-time statistics and analytics dashboard
- **Content Moderation**: Review and manage all platform content
- **System Health**: Monitor application performance and usage

## 🏆 **Technical Achievements**

### **Frontend Excellence**
- ⚡ **Performance**: Optimized React components with lazy loading
- 🎨 **Design**: Modern UI with Tailwind CSS and gradient themes
- 📱 **Responsive**: Mobile-first design approach
- 🔄 **State Management**: Redux Toolkit for efficient data flow
- 🛣️ **Routing**: Protected routes with role-based access

### **Backend Robustness**
- 🔐 **Security**: JWT authentication with role-based authorization
- 📊 **Database**: Optimized MongoDB schemas with proper indexing
- 🚀 **Performance**: Efficient API endpoints with proper error handling
- 📁 **File Management**: Cloudinary integration for media uploads
- 💬 **Real-time**: Socket.io for instant messaging

### **DevOps & Deployment**
- 🌐 **Cloud Ready**: Environment-based configuration
- 📦 **Containerizable**: Docker-ready application structure
- 🔧 **Monitoring**: Health check endpoints and error logging
- 🚀 **Scalable**: Modular architecture for easy scaling

## � Deveelopment Notes

### **Environment Setup**
- Node.js 18+ required for optimal performance
- MongoDB 5.0+ recommended for latest features
- Cloudinary account optional (fallback to direct URLs)

### **Production Considerations**
- Use strong, unique `JWT_SECRET` (32+ characters)
- Enable MongoDB authentication and SSL
- Configure CORS for your domain only
- Set up proper error logging and monitoring
- Use HTTPS in production environment

### **Performance Optimizations**
- Images and videos optimized through Cloudinary
- React components use lazy loading
- Database queries optimized with proper indexing
- API responses cached where appropriate

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- 📧 Email: support@edunexus.com
- 💬 GitHub Issues: [Create an issue](https://github.com/DeepenNehra/edunexus/issues)
- 📖 Documentation: Check the `/docs` folder for detailed guides

## 🙏 Acknowledgments

- **MERN Stack Community** for excellent documentation
- **Socket.io** for real-time communication capabilities
- **Cloudinary** for media management solutions
- **Tailwind CSS** for the beautiful, responsive design system

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using the MERN Stack**

*EduNexus - Empowering Education Through Technology*

