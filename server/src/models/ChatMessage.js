const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true, index: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = { ChatMessage: mongoose.model('ChatMessage', chatMessageSchema) };


