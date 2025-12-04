import { Router } from 'express';
import { ServicoController } from '../controllers/ServicoController';

const router = Router();

router.get('/', ServicoController.index);
router.get('/:id', ServicoController.show);
router.post('/', ServicoController.store);
router.put('/:id', ServicoController.update);
router.put('/:id/realizado', ServicoController.marcarRealizado);
router.delete('/:id', ServicoController.delete);

export default router;
