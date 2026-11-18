import dotenv from 'dotenv';
import mongoose from 'mongoose';
import dns from 'dns';
import path from 'path';
import { fileURLToPath } from 'url';

import Memory from './models/Memory.js';
import Gallery from './models/Gallery.js';
import Appreciation from './models/Appreciation.js';
import Letter from './models/Letter.js';
import StarMessage from './models/StarMessage.js';
import SiteSettings from './models/SiteSettings.js';
import User from './models/User.js';

import {
  initialSettings,
  initialMemories,
  initialGallery,
  initialAppreciations,
  initialLetters,
  initialStars
} from './utils/seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });
dns.setServers(['8.8.8.8', '8.8.4.4']);

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('No MONGODB_URI found.');
    process.exit(1);
  }

  console.log('Connecting to MongoDB Atlas for refreshing photos...');
  await mongoose.connect(uri);
  console.log('✅ Connected to MongoDB Atlas!');

  // Refresh Gallery with all 23 real photos
  await Gallery.deleteMany({});
  await Gallery.insertMany(initialGallery);
  console.log(`🌸 Seeded Gallery: ${initialGallery.length} Deepu photos inserted!`);

  // Refresh Memories with real photo milestones
  await Memory.deleteMany({});
  await Memory.insertMany(initialMemories);
  console.log(`🌸 Seeded Memories: ${initialMemories.length} milestones updated with photos!`);

  // Ensure Settings exist
  const settingsCount = await SiteSettings.countDocuments();
  if (settingsCount === 0) {
    await SiteSettings.create(initialSettings);
  }

  // Ensure Appreciations exist
  const appCount = await Appreciation.countDocuments();
  if (appCount === 0) {
    await Appreciation.insertMany(initialAppreciations);
  }

  // Ensure Letters exist
  const letCount = await Letter.countDocuments();
  if (letCount === 0) {
    await Letter.insertMany(initialLetters);
  }

  // Ensure Stars exist
  const starCount = await StarMessage.countDocuments();
  if (starCount === 0) {
    await StarMessage.insertMany(initialStars);
  }

  // Ensure Admin User exists
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'deepu123';
  const existingUser = await User.findOne({ username: adminUsername });
  if (!existingUser) {
    await User.create({ username: adminUsername, password: adminPassword });
  }

  console.log('\n🎉 ALL 23 DEEPU PHOTOS ARE NOW LIVE IN MONGODB ATLAS!');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seeding error:', err);
  process.exit(1);
});
