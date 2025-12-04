import { Router } from 'express';
import { ClienteController } from '../controllers/ClienteController';

const router = Router();

router.get('/', ClienteController.index);
router.get('/:id', ClienteController.show);
router.post('/', ClienteController.store);
router.put('/:id', ClienteController.update);
router.delete('/:id', ClienteController.delete);

export default router;
