import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';

// Route imports
import authRoutes from './routes/auth.js';
import settingsRoutes from './routes/settings.js';
import memoriesRoutes from './routes/memories.js';
import galleryRoutes from './routes/gallery.js';
import appreciationsRoutes from './routes/appreciations.js';
import lettersRoutes from './routes/letters.js';
import starsRoutes from './routes/stars.js';
import uploadRoutes from './routes/upload.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB if available
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/memories', memoriesRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/appreciations', appreciationsRoutes);
app.use('/api/letters', lettersRoutes);
app.use('/api/stars', starsRoutes);
app.use('/api/upload', uploadRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    project: 'Dear Deepuuu ♡',
    timestamp: new Date().toISOString()
  });
});

// Serve frontend build if in production
const clientDist = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDist));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(clientDist, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`🌸 Dear Deepuuu server running on http://localhost:${PORT}`);
});
