require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
const { app } = require('./app');

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/edunexus';

async function start() {
  try {
    await mongoose.connect(MONGODB_URI);
    const server = http.createServer(app);

    const { Server } = require('socket.io');
    const io = new Server(server, { cors: { origin: '*' } });
    const { ChatMessage } = require('./models/ChatMessage');
    
    io.on('connection', (socket) => {
      socket.on('join-course', (courseId) => {
        socket.join(`course-${courseId}`);
      });

      socket.on('send-message', async (data) => {
        try {
          const { courseId, senderId, message } = data;
          const chatMsg = await ChatMessage.create({ course: courseId, sender: senderId, message });
          const populated = await ChatMessage.findById(chatMsg._id).populate('sender', 'name email');
          io.to(`course-${courseId}`).emit('new-message', populated);
        } catch (err) {
          socket.emit('error', { message: 'Failed to send message' });
        }
      });
    });

    // Export io for use in routes if needed
    app.locals.io = io;

    server.listen(PORT, () => {
      console.log('\n' + '='.repeat(60));
      console.log('🚀 EduNexus LMS Server Started');
      console.log('='.repeat(60));
      console.log(`📡 API Server: http://localhost:${PORT}`);
      console.log(`🗄️  Database: Connected to MongoDB`);
      console.log(`🔐 JWT Auth: Enabled`);
      
      // Check Google OAuth status
      if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
        console.log(`✅ Google OAuth: Configured and Ready`);
      } else {
        console.log(`⚠️  Google OAuth: Not Configured`);
        console.log(`   → Email/password auth is working`);
        console.log(`   → See QUICK_START_GOOGLE_AUTH.md to enable Google login`);
      }
      
      console.log('='.repeat(60) + '\n');
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();


