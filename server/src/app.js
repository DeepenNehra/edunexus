const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('./config/passport');

const healthRouter = require('./routes/health.routes');
const authRouter = require('./routes/auth.routes');
const courseRouter = require('./routes/course.routes');
const lectureRouter = require('./routes/lecture.routes');
const assignmentRouter = require('./routes/assignment.routes');
const chatRouter = require('./routes/chat.routes');
const adminRouter = require('./routes/admin.routes');
const liveClassRouter = require('./routes/liveclass.routes');
const fileRouter = require('./routes/file.routes');

const app = express();

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:5175',
      process.env.CLIENT_URL,
      'https://edunexus-git-main-deepennehra-projects.vercel.app',
      'https://edunexus-nijyt2w9l-deepennehras-projects.vercel.app'
    ].filter(Boolean);
    
    // Allow all Vercel preview deployments
    if (origin.includes('vercel.app') || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 600 // Cache preflight for 10 minutes
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

// Session configuration for passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/courses', courseRouter);
app.use('/api/courses/:courseId/lectures', lectureRouter);
app.use('/api/courses/:courseId/assignments', assignmentRouter);
app.use('/api/courses/:courseId/chat', chatRouter);
app.use('/api/courses/:courseId/liveclasses', liveClassRouter);
app.use('/api/admin', adminRouter);
app.use('/api/files', fileRouter);

module.exports = { app };


