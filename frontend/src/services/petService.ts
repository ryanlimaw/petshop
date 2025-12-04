import api from './api';
import type { Pet, PetFormData } from '../types/index';

export const petService = {
  async getAll(): Promise<Pet[]> {
    const response = await api.get<Pet[]>('/pets');
    return response.data;
  },

  async getById(id: number): Promise<Pet> {
    const response = await api.get<Pet>(`/pets/${id}`);
    return response.data;
  },

  async create(data: PetFormData): Promise<Pet> {
    const response = await api.post<Pet>('/pets', data);
    return response.data;
  },

  async update(id: number, data: Partial<PetFormData>): Promise<Pet> {
    const response = await api.put<Pet>(`/pets/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/pets/${id}`);
  },
};
