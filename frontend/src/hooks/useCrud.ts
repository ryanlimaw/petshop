import { useState, useEffect, useCallback } from 'react';

interface CrudService<T, TForm> {
  getAll: () => Promise<T[]>;
  create: (data: TForm) => Promise<T>;
  update: (id: number, data: Partial<TForm>) => Promise<T>;
  delete: (id: number) => Promise<void>;
}

export function useCrud<T extends { id: number }, TForm>(
  service: CrudService<T, TForm>,
  autoFetch = true
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.getAll();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  }, [service]);

  const createItem = useCallback(async (formData: TForm) => {
    try {
      const newItem = await service.create(formData);
      setData(prev => [...prev, newItem]);
      return newItem;
    } catch (err) {
      throw err;
    }
  }, [service]);

  const updateItem = useCallback(async (id: number, formData: Partial<TForm>) => {
    try {
      const updatedItem = await service.update(id, formData);
      setData(prev => prev.map(item =>
        item.id === id ? updatedItem : item
      ));
      return updatedItem;
    } catch (err) {
      throw err;
    }
  }, [service]);

  const deleteItem = useCallback(async (id: number) => {
    try {
      await service.delete(id);
      setData(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      throw err;
    }
  }, [service]);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [fetchData, autoFetch]);

  return {
    data,
    loading,
    error,
    createItem,
    updateItem,
    deleteItem,
    refetch: fetchData,
  };
}
