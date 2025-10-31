const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
  {
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true, index: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    fileUrl: { type: String, required: true },
    fileName: { type: String },
    grade: { type: Number, min: 0, max: 100 },
    feedback: { type: String },
  },
  { timestamps: true }
);

module.exports = { Submission: mongoose.model('Submission', submissionSchema) };


