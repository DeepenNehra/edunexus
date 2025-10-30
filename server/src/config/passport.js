const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Only configure Google Strategy if credentials are provided
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log('Google OAuth callback received for:', profile.emails[0].value);
          
          // Check if user already exists
          let user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            console.log('Existing user found:', user.email);
            // Update Google ID if not set
            if (!user.googleId) {
              user.googleId = profile.id;
              await user.save();
            }
            return done(null, user);
          }

          // Create new user
          console.log('Creating new user from Google profile');
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0]?.value,
            role: 'student', // Default role for Google sign-ups
            passwordHash: '', // No password for OAuth users
          });

          console.log('New user created:', user.email);
          done(null, user);
        } catch (err) {
          console.error('Error in Google OAuth callback:', err);
          done(err, null);
        }
      }
    )
  );
  console.log('✓ Google OAuth Strategy configured');
} else {
  console.warn('⚠ Google OAuth credentials not configured. Google login will not work.');
  console.warn('  Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in your .env file');
  console.warn('  See GOOGLE_OAUTH_SETUP.md for instructions');
}

module.exports = passport;
