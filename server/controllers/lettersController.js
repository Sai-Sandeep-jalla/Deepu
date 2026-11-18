import mongoose from 'mongoose';
import Letter from '../models/Letter.js';
import { initialLetters } from '../utils/seedData.js';

let inMemoryLetters = initialLetters.map((l, i) => ({ ...l, id: 'let-' + (i + 1) }));

export const getLetters = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const items = await Letter.find({ isPublished: true }).sort({ order: 1 });
      if (items.length > 0) return res.json(items);
    }
    return res.json(inMemoryLetters);
  } catch (err) {
    return res.json(inMemoryLetters);
  }
};

export const updateLetter = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
      const updated = await Letter.findByIdAndUpdate(id, data, { new: true });
      if (updated) return res.json(updated);
    }
    inMemoryLetters = inMemoryLetters.map(item => ((item.id === id || item._id === id) ? { ...item, ...data } : item));
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
