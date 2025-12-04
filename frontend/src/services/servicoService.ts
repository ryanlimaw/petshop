import api from './api';
import type { Servico, ServicoFormData } from '../types/index';

export const servicoService = {
  async getAll(): Promise<Servico[]> {
    const response = await api.get<Servico[]>('/servicos');
    return response.data;
  },

  async getById(id: number): Promise<Servico> {
    const response = await api.get<Servico>(`/servicos/${id}`);
    return response.data;
  },

  async create(data: ServicoFormData): Promise<Servico> {
    const response = await api.post<Servico>('/servicos', data);
    return response.data;
  },

  async update(id: number, data: Partial<ServicoFormData>): Promise<Servico> {
    const response = await api.put<Servico>(`/servicos/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/servicos/${id}`);
  },

  async marcarRealizado(id: number): Promise<Servico> {
    const response = await api.patch<Servico>(`/servicos/${id}/realizado`);
    return response.data;
  },
};
