import { Router } from 'express';
import clienteRoutes from './clienteRoutes';
import petRoutes from './petRoutes';
import servicoRoutes from './servicoRoutes';

const router = Router();

router.use('/clientes', clienteRoutes);
router.use('/pets', petRoutes);
router.use('/servicos', servicoRoutes);

export default router;
