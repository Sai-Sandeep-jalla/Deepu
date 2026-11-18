import express from 'express';
import { getAppreciations, updateAppreciation } from '../controllers/appreciationsController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAppreciations);
router.put('/:id', protect, updateAppreciation);

export default router;
