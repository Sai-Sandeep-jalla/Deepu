import mongoose from 'mongoose';
import Appreciation from '../models/Appreciation.js';
import { initialAppreciations } from '../utils/seedData.js';

let inMemoryAppreciations = initialAppreciations.map((a, i) => ({ ...a, id: 'app-' + (i + 1) }));

export const getAppreciations = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const items = await Appreciation.find({ isPublished: true }).sort({ order: 1 });
      if (items.length > 0) return res.json(items);
    }
    return res.json(inMemoryAppreciations);
  } catch (err) {
    return res.json(inMemoryAppreciations);
  }
};

export const updateAppreciation = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
      const updated = await Appreciation.findByIdAndUpdate(id, data, { new: true });
      if (updated) return res.json(updated);
    }
    inMemoryAppreciations = inMemoryAppreciations.map(item => ((item.id === id || item._id === id) ? { ...item, ...data } : item));
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
