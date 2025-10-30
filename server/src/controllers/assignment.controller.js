const { Assignment } = require('../models/Assignment');
const { Submission } = require('../models/Submission');
const { uploadVideoToCloudinary } = require('../config/cloudinary');

async function listByCourse(req, res) {
  const { courseId } = req.params;
  const assignments = await Assignment.find({ course: courseId }).sort({ createdAt: -1 });
  return res.json({ assignments });
}

async function create(req, res) {
  try {
    const { courseId } = req.params;
    const { title, description, dueAt } = req.body;
    if (!title) return res.status(400).json({ error: 'Title required' });
    
    let attachmentUrl = req.body.attachmentUrl;
    if (req.file) {
      const result = await uploadVideoToCloudinary(req.file.buffer);
      attachmentUrl = result.secure_url;
    }
    
    const assignment = await Assignment.create({ course: courseId, title, description, dueAt, attachmentUrl });
    return res.status(201).json({ assignment });
  } catch (err) {
    return res.status(500).json({ error: 'Failed: ' + err.message });
  }
}

async function submitAssignment(req, res) {
  try {
    const { id } = req.params; // assignment id
    const studentId = req.user.id;
    
    let fileUrl = req.body.fileUrl;
    if (req.file) {
      const result = await uploadVideoToCloudinary(req.file.buffer);
      fileUrl = result.secure_url;
    }
    
    if (!fileUrl) return res.status(400).json({ error: 'File URL or file required' });
    
    const existing = await Submission.findOne({ assignment: id, student: studentId });
    if (existing) {
      existing.fileUrl = fileUrl;
      await existing.save();
      return res.json({ submission: existing });
    }
    
    const submission = await Submission.create({ assignment: id, student: studentId, fileUrl });
    return res.status(201).json({ submission });
  } catch (err) {
    return res.status(500).json({ error: 'Failed: ' + err.message });
  }
}

async function listSubmissions(req, res) {
  const { id } = req.params; // assignment id
  const submissions = await Submission.find({ assignment: id }).populate('student', 'name email');
  return res.json({ submissions });
}

module.exports = { listByCourse, create, submitAssignment, listSubmissions };

