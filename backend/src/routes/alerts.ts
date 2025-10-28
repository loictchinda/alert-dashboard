import { Router } from 'express';
import { alertsController } from '../controllers/alertsController';

const router = Router();

router.get('/', (req, res) => alertsController.getAllAlerts(req, res));
router.get('/:id', (req, res) => alertsController.getAlertById(req, res));

export default router;