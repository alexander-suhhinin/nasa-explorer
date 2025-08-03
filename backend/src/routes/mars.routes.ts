

import { Router, Request, Response } from 'express';
import { getMarsPhotos } from '../controllers/mars.controller';

const router = Router();

/**
 * GET /api/mars
 * Query params (optional):
 *   - sol: number (Martian solar day)
 *   - earth_date: YYYY-MM-DD
 *   - camera: camera name (e.g., FHAZ, RHAZ, NAVCAM)
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const { sol, earth_date, camera } = req.query;

    const queryParams: any = {};
    if (sol) queryParams.sol = Number(sol);
    if (earth_date) queryParams.earth_date = String(earth_date);
    if (camera) queryParams.camera = String(camera);

    const data = await getMarsPhotos(queryParams);

    res.status(200).json(data);
  } catch (error) {
    console.error('[Mars] Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch Mars Rover photos' });
  }
});

export default router;