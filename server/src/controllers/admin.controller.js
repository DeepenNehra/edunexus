const { User } = require('../models/User');
const { Course } = require('../models/Course');
const { Lecture } = require('../models/Lecture');
const { Assignment } = require('../models/Assignment');
const { Submission } = require('../models/Submission');

// User Management
async function listUsers(req, res) {
  try {
    const users = await User.find({}).select('-passwordHash').sort({ createdAt: -1 });
    return res.json({ users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.id).select('-passwordHash');
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function updateUser(req, res) {
  try {
    const { name, email, role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (role !== undefined) user.role = role;
    
    await user.save();
    const updatedUser = user.toObject();
    delete updatedUser.passwordHash;
    return res.json({ user: updatedUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function deleteUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    // Don't allow deleting yourself
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }
    
    await user.deleteOne();
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Dashboard Statistics
async function getStatistics(req, res) {
  try {
    const totalUsers = await User.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalLectures = await Lecture.countDocuments();
    const totalAssignments = await Assignment.countDocuments();
    const totalSubmissions = await Submission.countDocuments();
    
    const usersByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);
    
    const recentUsers = await User.find({})
      .select('-passwordHash')
      .sort({ createdAt: -1 })
      .limit(5);
    
    const recentCourses = await Course.find({})
      .populate('instructor', 'name')
      .sort({ createdAt: -1 })
      .limit(5);
    
    return res.json({
      statistics: {
        totalUsers,
        totalCourses,
        totalLectures,
        totalAssignments,
        totalSubmissions,
        usersByRole,
        recentUsers,
        recentCourses
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Content Moderation
async function deleteContent(req, res) {
  try {
    const { type, id } = req.params;
    
    let result;
    switch (type) {
      case 'course':
        result = await Course.findByIdAndDelete(id);
        break;
      case 'lecture':
        result = await Lecture.findByIdAndDelete(id);
        break;
      case 'assignment':
        result = await Assignment.findByIdAndDelete(id);
        break;
      case 'submission':
        result = await Submission.findByIdAndDelete(id);
        break;
      default:
        return res.status(400).json({ error: 'Invalid content type' });
    }
    
    if (!result) return res.status(404).json({ error: 'Content not found' });
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  listUsers,
  getUser,
  updateUser,
  deleteUser,
  getStatistics,
  deleteContent
};
