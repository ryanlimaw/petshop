import prisma from '../config/database';
import { PetInput } from '../validations/petValidation';

export class PetService {
  static async findAll() {
    return await prisma.pet.findMany({
      include: { cliente: true, servicos: true }
    });
  }

  static async findById(id: number) {
    return await prisma.pet.findUnique({
      where: { id },
      include: { cliente: true, servicos: true }
    });
  }

  static async create(data: PetInput) {
    return await prisma.pet.create({
      data,
      include: { cliente: true, servicos: true }
    });
  }

  static async update(id: number, data: Partial<PetInput>) {
    return await prisma.pet.update({
      where: { id },
      data,
      include: { cliente: true, servicos: true }
    });
  }

  static async delete(id: number) {
    return await prisma.pet.delete({ where: { id } });
  }
}
