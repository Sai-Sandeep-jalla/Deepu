import express from 'express';
import { getStars, updateStar } from '../controllers/starsController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getStars);
router.put('/:id', protect, updateStar);

export default router;
