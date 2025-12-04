import { useState, useEffect } from 'react';
import { clienteService } from '../services/clienteService';
import { petService } from '../services/petService';
import { servicoService } from '../services/servicoService';

export interface Stats {
  clientes: number;
  pets: number;
  servicos: number;
}

export const useStats = () => {
  const [stats, setStats] = useState<Stats>({
    clientes: 0,
    pets: 0,
    servicos: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [clientes, pets, servicos] = await Promise.all([
          clienteService.getAll(),
          petService.getAll(),
          servicoService.getAll(),
        ]);

        setStats({
          clientes: clientes.length,
          pets: pets.length,
          servicos: servicos.length,
        });
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading };
};
