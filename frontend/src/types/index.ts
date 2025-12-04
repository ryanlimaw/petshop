export interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}

export interface Pet {
  id: number;
  nome: string;
  especie: string;
  clienteId: number;
  cliente?: Cliente;
}

export interface Servico {
  id: number;
  tipo: string;
  preco: number;
  realizado: boolean;
  clienteId: number;
  petId?: number;
  cliente?: Cliente;
  pet?: Pet;
}

export interface ClienteFormData {
  nome: string;
  email: string;
  telefone: string;
}

export interface PetFormData {
  nome: string;
  especie: string;
  clienteId: number;
}

export interface ServicoFormData {
  tipo: string;
  preco: number;
  clienteId: number;
  petId?: number;
}
