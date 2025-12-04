import prisma from '../config/database';
import { ServicoInput } from '../validations/servicoValidation';

export class ServicoService {
  static async findAll() {
    return await prisma.servico.findMany({
      include: { cliente: true, pet: true }
    });
  }

  static async findById(id: number) {
    return await prisma.servico.findUnique({
      where: { id },
      include: { cliente: true, pet: true }
    });
  }

  static async create(data: ServicoInput) {
    return await prisma.servico.create({
      data,
      include: { cliente: true, pet: true }
    });
  }

  static async update(id: number, data: Partial<ServicoInput>) {
    return await prisma.servico.update({
      where: { id },
      data,
      include: { cliente: true, pet: true }
    });
  }

  static async delete(id: number) {
    return await prisma.servico.delete({ where: { id } });
  }

  static async marcarRealizado(id: number) {
    return await prisma.servico.update({
      where: { id },
      data: { realizado: true },
      include: { cliente: true, pet: true }
    });
  }
}
