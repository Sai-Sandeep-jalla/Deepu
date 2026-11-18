import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import mongoose from 'mongoose';

const generateToken = (id, username) => {
  return jwt.sign({ id, username }, process.env.JWT_SECRET || 'deepuuu_super_secret_jwt_key_2026', {
    expiresIn: '30d'
  });
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const adminUser = process.env.ADMIN_USERNAME || 'admin';
  const adminPass = process.env.ADMIN_PASSWORD || 'deepu123';

  // Direct env check first
  if (username === adminUser && password === adminPass) {
    const token = generateToken('admin-id', username);
    return res.json({ token, username });
  }

  // MongoDB check if connected
  if (mongoose.connection.readyState === 1) {
    try {
      const user = await User.findOne({ username });
      if (user && (await user.matchPassword(password))) {
        return res.json({
          token: generateToken(user._id, user.username),
          username: user.username
        });
      }
    } catch (err) {}
  }

  // Fallback check
  if (username === 'admin' && (password === 'deepuuu123' || password === 'deepu123')) {
    const token = generateToken('fallback-id', 'admin');
    return res.json({ token, username: 'admin' });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
};
