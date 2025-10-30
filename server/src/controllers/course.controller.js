const { Course } = require('../models/Course');

async function listCourses(req, res) {
  const courses = await Course.find({}).populate('instructor', 'name');
  return res.json({ courses });
}

async function getCourse(req, res) {
  const course = await Course.findById(req.params.id).populate('instructor', 'name');
  if (!course) return res.status(404).json({ error: 'Not found' });
  return res.json({ course });
}

async function createCourse(req, res) {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: 'Title required' });
  const course = await Course.create({ title, description, instructor: req.user.id });
  return res.status(201).json({ course });
}

async function updateCourse(req, res) {
  const { title, description } = req.body;
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ error: 'Not found' });
  if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  if (title !== undefined) course.title = title;
  if (description !== undefined) course.description = description;
  await course.save();
  return res.json({ course });
}

async function deleteCourse(req, res) {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ error: 'Not found' });
  if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  await course.deleteOne();
  return res.json({ success: true });
}

async function enroll(req, res) {
  const { id } = req.params;
  const course = await Course.findById(id);
  if (!course) return res.status(404).json({ error: 'Not found' });
  if (course.students.some((s) => s.toString() === req.user.id)) {
    return res.json({ enrolled: true });
  }
  course.students.push(req.user.id);
  await course.save();
  return res.json({ enrolled: true });
}

module.exports = { listCourses, getCourse, createCourse, updateCourse, deleteCourse, enroll };


