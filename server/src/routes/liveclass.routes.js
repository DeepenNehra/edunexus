const { Router } = require('express');
const { requireAuth, requireRole } = require('../middleware/auth');
const {
  listByCourse,
  create,
  update,
  deleteLiveClass,
  joinClass
} = require('../controllers/liveclass.controller');

const router = Router({ mergeParams: true });

router.get('/', listByCourse);
router.post('/', requireAuth, requireRole('instructor', 'admin'), create);
router.put('/:id', requireAuth, requireRole('instructor', 'admin'), update);
router.delete('/:id', requireAuth, requireRole('instructor', 'admin'), deleteLiveClass);
router.post('/:id/join', requireAuth, joinClass);

module.exports = router;
