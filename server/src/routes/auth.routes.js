const { Router } = require('express');
const { signup, login, googleCallback } = require('../controllers/auth.controller');
const passport = require('../config/passport');

const router = Router();

router.post('/signup', signup);
router.post('/login', login);

// Google OAuth routes
router.get('/google', (req, res, next) => {
  // Check if Google OAuth is configured
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || 
      process.env.GOOGLE_CLIENT_ID === 'your-google-client-id-here') {
    const clientURL = process.env.CLIENT_URL || 'http://localhost:5173';
    return res.redirect(`${clientURL}/login?error=google_oauth_not_configured`);
  }
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    session: true 
  })(req, res, next);
});

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


