const { Router } = require('express');
const { requireAuth, requireRole } = require('../middleware/auth');
const { listCourses, getCourse, createCourse, updateCourse, deleteCourse, enroll } = require('../controllers/course.controller');

const router = Router();

router.get('/', listCourses);
router.get('/:id', getCourse);

router.post('/', requireAuth, requireRole('instructor', 'admin'), createCourse);
router.put('/:id', requireAuth, requireRole('instructor', 'admin'), updateCourse);
router.delete('/:id', requireAuth, requireRole('instructor', 'admin'), deleteCourse);

router.post('/:id/enroll', requireAuth, requireRole('student', 'admin'), enroll);

module.exports = router;


