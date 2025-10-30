const { Lecture } = require('../models/Lecture');
const { uploadVideoToCloudinary } = require('../config/cloudinary');

async function listByCourse(req, res) {
  const { courseId } = req.params;
  const lectures = await Lecture.find({ course: courseId }).sort({ createdAt: 1 });
  return res.json({ lectures });
}

async function create(req, res) {
  try {
    const { courseId } = req.params;
    const { title, description, durationSec } = req.body;
    if (!title) return res.status(400).json({ error: 'Title required' });
    
    let videoUrl = req.body.videoUrl; // fallback for direct URL
    
    // Handle file upload if present
    if (req.file) {
      const result = await uploadVideoToCloudinary(req.file.buffer);
      videoUrl = result.secure_url;
    }
    
    if (!videoUrl) return res.status(400).json({ error: 'Video URL or file required' });
    
    const lecture = await Lecture.create({ course: courseId, title, description, videoUrl, durationSec });
    return res.status(201).json({ lecture });
  } catch (err) {
    return res.status(500).json({ error: 'Upload failed: ' + err.message });
  }
}

module.exports = { listByCourse, create };


