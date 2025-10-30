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

const app = express();

app.use(cors());
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

module.exports = { app };


