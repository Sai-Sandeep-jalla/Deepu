import mongoose from 'mongoose';
import StarMessage from '../models/StarMessage.js';
import { initialStars } from '../utils/seedData.js';

let inMemoryStars = initialStars.map((s, i) => ({ ...s, id: 'star-' + (i + 1) }));

export const getStars = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const items = await StarMessage.find({ isPublished: true }).sort({ order: 1 });
      if (items.length > 0) return res.json(items);
    }
    return res.json(inMemoryStars);
  } catch (err) {
    return res.json(inMemoryStars);
  }
};

export const updateStar = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
      const updated = await StarMessage.findByIdAndUpdate(id, data, { new: true });
      if (updated) return res.json(updated);
    }
    inMemoryStars = inMemoryStars.map(item => ((item.id === id || item._id === id) ? { ...item, ...data } : item));
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
