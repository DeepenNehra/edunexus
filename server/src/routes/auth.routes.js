const { Router } = require('express');
const { signup, login, googleCallback } = require('../controllers/auth.controller');
const passport = require('../config/passport');

const router = Router();

router.post('/signup', signup);
router.post('/login', login);

// Google OAuth routes
router.get('/google', passport.authenticate('google', { 
  scope: ['profile', 'email'],
  session: true 
}));

router.get(
  '/google/callback',
  (req, res, next) => {
    passport.authenticate('google', { 
      failureRedirect: `${process.env.CLIENT_URL || 'http://localhost:5173'}/login?error=google_auth_failed`,
      session: true 
    })(req, res, next);
  },
  googleCallback
);

module.exports = router;


