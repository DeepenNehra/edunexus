const { Router } = require('express');
const { requireAuth, requireRole } = require('../middleware/auth');
const { listByCourse, create } = require('../controllers/lecture.controller');
const { upload } = require('../config/cloudinary');

const router = Router({ mergeParams: true });

router.get('/', listByCourse);
router.post('/', requireAuth, requireRole('instructor', 'admin'), upload.single('video'), create);

module.exports = router;


