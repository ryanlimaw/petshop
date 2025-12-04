import prisma from '../config/database';
import { ClienteInput } from '../validations/clienteValidation';

export class ClienteService {
  static async findAll() {
    return await prisma.cliente.findMany({
      include: { pets: true, servicos: true }
    });
  }

  static async findById(id: number) {
    return await prisma.cliente.findUnique({
      where: { id },
      include: { pets: true, servicos: true }
    });
  }

  static async create(data: ClienteInput) {
    return await prisma.cliente.create({
      data,
      include: { pets: true, servicos: true }
    });
  }

  static async update(id: number, data: Partial<ClienteInput>) {
    return await prisma.cliente.update({
      where: { id },
      data,
      include: { pets: true, servicos: true }
    });
  }

  static async delete(id: number) {
    return await prisma.cliente.delete({ where: { id } });
  }
}
