import { Router } from 'express';
import { PetController } from '../controllers/PetController';

const router = Router();

router.get('/', PetController.index);

router.get('/:id', PetController.show);
router.post('/', PetController.store);
router.put('/:id', PetController.update);
router.delete('/:id', PetController.delete);

export default router;
