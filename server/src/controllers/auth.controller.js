const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, USER_ROLES } = require('../models/User');

function signToken(user) {
  return jwt.sign({ id: user._id.toString(), role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
}

async function signup(req, res) {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });
    if (role && !USER_ROLES.includes(role)) return res.status(400).json({ error: 'Invalid role' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email already registered' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash, role: role || 'student' });
    const token = signToken(user);
    return res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    return res.status(500).json({ error: 'Signup failed' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    if (!user.passwordHash) return res.status(401).json({ error: 'Please sign in with Google' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = signToken(user);
    return res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    return res.status(500).json({ error: 'Login failed' });
  }
}

async function googleCallback(req, res) {
  try {
    // User is available in req.user from passport
    const user = req.user;
    const token = signToken(user);
    
    // Redirect to frontend with token
    const clientURL = process.env.CLIENT_URL || 'http://localhost:5173';
    return res.redirect(`${clientURL}/auth/google/success?token=${token}`);
  } catch (err) {
    const clientURL = process.env.CLIENT_URL || 'http://localhost:5173';
    return res.redirect(`${clientURL}/login?error=authentication_failed`);
  }
}

module.exports = { signup, login, googleCallback };


