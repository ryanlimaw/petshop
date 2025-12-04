import api from './api';
import type { Cliente, ClienteFormData } from '../types/index';

export const clienteService = {
  async getAll(): Promise<Cliente[]> {
    const response = await api.get<Cliente[]>('/clientes');
    return response.data;
  },

  async getById(id: number): Promise<Cliente> {
    const response = await api.get<Cliente>(`/clientes/${id}`);
    return response.data;
  },

  async create(data: ClienteFormData): Promise<Cliente> {
    const response = await api.post<Cliente>('/clientes', data);
    return response.data;
  },

  async update(id: number, data: Partial<ClienteFormData>): Promise<Cliente> {
    const response = await api.put<Cliente>(`/clientes/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/clientes/${id}`);
  },
};
