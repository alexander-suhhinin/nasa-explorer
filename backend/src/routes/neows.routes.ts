import { Router, Request, Response } from 'express';
import { getNeoWs } from '../controllers/neows.controller';

const router = Router();

/**
 * GET /api/neows
 * Query params (optional):
 *   - start_date: YYYY-MM-DD (default: 7 days ago)
 *   - end_date: YYYY-MM-DD (default: today)
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const { start_date, end_date } = req.query;

    const queryParams: any = {};
    if (start_date) queryParams.start_date = String(start_date);
    if (end_date) queryParams.end_date = String(end_date);

    const data = await getNeoWs(queryParams);

    res.status(200).json(data);
  } catch (error) {
    console.error('[NeoWs] Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch Near-Earth Objects data' });
  }
});

export default router;
