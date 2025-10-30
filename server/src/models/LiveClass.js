const mongoose = require('mongoose');

const liveClassSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true, index: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    scheduledAt: { type: Date, required: true, index: true },
    duration: { type: Number, default: 60 }, // in minutes
    meetingLink: { type: String, trim: true },
    platform: { type: String, enum: ['zoom', 'meet', 'teams', 'other'], default: 'other' },
    status: { type: String, enum: ['scheduled', 'live', 'completed', 'cancelled'], default: 'scheduled', index: true },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
);

module.exports = {
  LiveClass: mongoose.model('LiveClass', liveClassSchema)
};
