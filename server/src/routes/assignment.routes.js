const { Router } = require('express');
const { requireAuth, requireRole } = require('../middleware/auth');
const { listByCourse, create, submitAssignment, listSubmissions } = require('../controllers/assignment.controller');
const { upload } = require('../config/cloudinary');

const router = Router({ mergeParams: true });

router.get('/', listByCourse);
router.post('/', requireAuth, requireRole('instructor', 'admin'), upload.single('attachment'), create);

router.post('/:id/submit', requireAuth, requireRole('student', 'admin'), upload.single('file'), submitAssignment);
router.get('/:id/submissions', requireAuth, requireRole('instructor', 'admin'), listSubmissions);

module.exports = router;

