import mongoose from 'mongoose';
import Gallery from '../models/Gallery.js';
import { initialGallery } from '../utils/seedData.js';

let inMemoryGallery = initialGallery.map((g, i) => ({ ...g, id: 'gal-' + (i + 1) }));

export const getGallery = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const items = await Gallery.find({ isPublished: true }).sort({ order: 1 });
      if (items.length > 0) return res.json(items);
    }
    return res.json(inMemoryGallery);
  } catch (err) {
    return res.json(inMemoryGallery);
  }
};

export const createGalleryItem = async (req, res) => {
  try {
    const data = req.body;
    if (mongoose.connection.readyState === 1) {
      const created = await Gallery.create(data);
      return res.status(201).json(created);
    }
    const newItem = { ...data, id: 'gal-' + Date.now() };
    inMemoryGallery.unshift(newItem);
    return res.status(201).json(newItem);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateGalleryItem = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
      const updated = await Gallery.findByIdAndUpdate(id, data, { new: true });
      if (updated) return res.json(updated);
    }
    inMemoryGallery = inMemoryGallery.map(item => ((item.id === id || item._id === id) ? { ...item, ...data } : item));
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteGalleryItem = async (req, res) => {
  const { id } = req.params;
  try {
    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
      await Gallery.findByIdAndDelete(id);
    }
    inMemoryGallery = inMemoryGallery.filter(item => item.id !== id && item._id !== id);
    return res.json({ message: 'Deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
