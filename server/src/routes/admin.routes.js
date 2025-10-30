const { Router } = require('express');
const { requireAuth, requireRole } = require('../middleware/auth');
const {
  listUsers,
  getUser,
  updateUser,
  deleteUser,
  getStatistics,
  deleteContent
} = require('../controllers/admin.controller');

const router = Router();

// All routes require admin role
router.use(requireAuth, requireRole('admin'));

// User management
router.get('/users', listUsers);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Statistics
router.get('/statistics', getStatistics);

// Content moderation
router.delete('/content/:type/:id', deleteContent);

module.exports = router;
