const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    videoUrl: { type: String, required: true },
    durationSec: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = { Lecture: mongoose.model('Lecture', lectureSchema) };


