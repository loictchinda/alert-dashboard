import { Router } from 'express';
import { alertsController } from '../controllers/alertsController';

const router = Router();

router.get('/monthly', (req, res) => alertsController.getMonthlyStats(req, res));
router.get('/by-subject', (req, res) => alertsController.getStatsBySubject(req, res));

export default router;