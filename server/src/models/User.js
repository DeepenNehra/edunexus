const mongoose = require('mongoose');

const USER_ROLES = ['admin', 'instructor', 'student'];

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    passwordHash: { type: String, default: '' },
    role: { type: String, enum: USER_ROLES, default: 'student', index: true },
    googleId: { type: String, sparse: true, unique: true },
    avatar: { type: String },
  },
  { timestamps: true }
);

module.exports = {
  User: mongoose.model('User', userSchema),
  USER_ROLES,
};


