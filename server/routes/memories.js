import express from 'express';
import {
  getMemories,
  createMemory,
  updateMemory,
  deleteMemory
} from '../controllers/memoriesController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getMemories);
router.post('/', protect, createMemory);
router.put('/:id', protect, updateMemory);
router.delete('/:id', protect, deleteMemory);

export default router;
