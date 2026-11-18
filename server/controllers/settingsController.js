import mongoose from 'mongoose';
import SiteSettings from '../models/SiteSettings.js';
import { initialSettings } from '../utils/seedData.js';

let inMemorySettings = { ...initialSettings };

export const getSettings = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const settings = await SiteSettings.findOne();
      if (settings) return res.json(settings);
    }
    return res.json(inMemorySettings);
  } catch (err) {
    return res.json(inMemorySettings);
  }
};

export const updateSettings = async (req, res) => {
  try {
    const updateData = req.body;
    inMemorySettings = { ...inMemorySettings, ...updateData };

    if (mongoose.connection.readyState === 1) {
      let settings = await SiteSettings.findOne();
      if (settings) {
        Object.assign(settings, updateData);
        await settings.save();
        return res.json(settings);
      } else {
        const created = await SiteSettings.create(updateData);
        return res.json(created);
      }
    }

    return res.json(inMemorySettings);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
