import express from 'express';
import { getLetters, updateLetter } from '../controllers/lettersController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getLetters);
router.put('/:id', protect, updateLetter);

export default router;
