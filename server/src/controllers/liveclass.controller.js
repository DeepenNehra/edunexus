const { LiveClass } = require('../models/LiveClass');
const { Course } = require('../models/Course');

async function listByCourse(req, res) {
  try {
    const { courseId } = req.params;
    const classes = await LiveClass.find({ course: courseId })
      .populate('instructor', 'name')
      .sort({ scheduledAt: 1 });
    return res.json({ classes });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function create(req, res) {
  try {
    const { courseId } = req.params;
    const { title, description, scheduledAt, duration, meetingLink, platform } = req.body;
    
    if (!title || !scheduledAt) {
      return res.status(400).json({ error: 'Title and scheduled time required' });
    }
    
    // Verify course exists and user is instructor
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    const liveClass = await LiveClass.create({
      course: courseId,
      instructor: req.user.id,
      title,
      description,
      scheduledAt,
      duration: duration || 60,
      meetingLink,
      platform: platform || 'other'
    });
    
    return res.status(201).json({ liveClass });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { title, description, scheduledAt, duration, meetingLink, platform, status } = req.body;
    
    const liveClass = await LiveClass.findById(id);
    if (!liveClass) return res.status(404).json({ error: 'Live class not found' });
    
    if (liveClass.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    if (title !== undefined) liveClass.title = title;
    if (description !== undefined) liveClass.description = description;
    if (scheduledAt !== undefined) liveClass.scheduledAt = scheduledAt;
    if (duration !== undefined) liveClass.duration = duration;
    if (meetingLink !== undefined) liveClass.meetingLink = meetingLink;
    if (platform !== undefined) liveClass.platform = platform;
    if (status !== undefined) liveClass.status = status;
    
    await liveClass.save();
    return res.json({ liveClass });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function deleteLiveClass(req, res) {
  try {
    const { id } = req.params;
    const liveClass = await LiveClass.findById(id);
    
    if (!liveClass) return res.status(404).json({ error: 'Live class not found' });
    
    if (liveClass.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    await liveClass.deleteOne();
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function joinClass(req, res) {
  try {
    const { id } = req.params;
    const liveClass = await LiveClass.findById(id);
    
    if (!liveClass) return res.status(404).json({ error: 'Live class not found' });
    
    if (!liveClass.attendees.includes(req.user.id)) {
      liveClass.attendees.push(req.user.id);
      await liveClass.save();
    }
    
    return res.json({ liveClass });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  listByCourse,
  create,
  update,
  deleteLiveClass,
  joinClass
};
