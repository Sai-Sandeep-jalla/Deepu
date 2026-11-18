import mongoose from 'mongoose';
import Memory from '../models/Memory.js';
import { initialMemories } from '../utils/seedData.js';

let inMemoryList = initialMemories.map((m, i) => ({ ...m, id: 'mem-' + (i + 1) }));

export const getMemories = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const items = await Memory.find({ isPublished: true }).sort({ order: 1 });
      if (items.length > 0) return res.json(items);
    }
    return res.json(inMemoryList);
  } catch (err) {
    return res.json(inMemoryList);
  }
};

export const createMemory = async (req, res) => {
  try {
    const data = req.body;
    if (mongoose.connection.readyState === 1) {
      const created = await Memory.create(data);
      return res.status(201).json(created);
    }
    const newItem = { ...data, id: 'mem-' + Date.now() };
    inMemoryList.push(newItem);
    return res.status(201).json(newItem);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateMemory = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
      const updated = await Memory.findByIdAndUpdate(id, data, { new: true });
      if (updated) return res.json(updated);
    }
    inMemoryList = inMemoryList.map(item => ((item.id === id || item._id === id) ? { ...item, ...data } : item));
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteMemory = async (req, res) => {
  const { id } = req.params;
  try {
    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
      await Memory.findByIdAndDelete(id);
    }
    inMemoryList = inMemoryList.filter(item => item.id !== id && item._id !== id);
    return res.json({ message: 'Deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
