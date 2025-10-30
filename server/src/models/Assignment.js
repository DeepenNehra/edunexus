const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    dueAt: { type: Date },
    attachmentUrl: { type: String },
  },
  { timestamps: true }
);

module.exports = { Assignment: mongoose.model('Assignment', assignmentSchema) };


