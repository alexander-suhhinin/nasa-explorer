

import { Router, Request, Response } from 'express';
import { getApod } from '../controllers/apod.controller';

const router = Router();

// GET /api/apod
router.get('/', async (req: Request, res: Response) => {
  try {
    const data = await getApod();
    res.status(200).json(data);
  } catch (error) {
    console.error('[APOD] Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch APOD data' });
  }
});

export default router;