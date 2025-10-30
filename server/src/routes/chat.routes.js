const { Router } = require('express');
const { requireAuth } = require('../middleware/auth');
const { ChatMessage } = require('../models/ChatMessage');

const router = Router({ mergeParams: true });

async function getMessages(req, res) {
  const { courseId } = req.params;
  const messages = await ChatMessage.find({ course: courseId })
    .populate('sender', 'name email')
    .sort({ createdAt: 1 })
    .limit(100);
  return res.json({ messages });
}

router.get('/', requireAuth, getMessages);

module.exports = router;

