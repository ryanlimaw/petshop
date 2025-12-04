import { Request, Response } from 'express';
import { PetService } from '../services/PetService';
import { petSchema, idSchema } from '../validations/petValidation';

export class PetController {
  /**
   * @swagger
   * /pets:
   *   get:
   *     summary: Listar todos os pets
   *     tags: [Pets]
   *     responses:
   *       200:
   *         description: Lista de pets
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Pet'
   */
  static async index(req: Request, res: Response) {
    try {
      const pets = await PetService.findAll();
      res.json(pets);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar pets' });
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const { id } = idSchema.parse(req.params);
      const pet = await PetService.findById(id);
      if (!pet) return res.status(404).json({ error: 'Pet não encontrado' });
      res.json(pet);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar pet' });
    }
  }

  /**
   * @swagger
   * /pets:
   *   post:
   *     summary: Criar novo pet
   *     tags: [Pets]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - nome
   *               - especie
   *               - clienteId
   *             properties:
   *               nome:
   *                 type: string
   *                 example: "Rex"
   *                 description: Nome do pet
   *               especie:
   *                 type: string
   *                 example: "Cachorro"
   *                 description: Espécie do animal
   *               clienteId:
   *                 type: integer
   *                 example: 1
   *                 description: ID do cliente proprietário
   *     responses:
   *       201:
   *         description: Pet criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Pet'
   *       400:
   *         description: Dados inválidos
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Erro interno do servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  static async store(req: Request, res: Response) {
    try {
      const data = petSchema.parse(req.body);
      const pet = await PetService.create(data);
      res.status(201).json(pet);
    } catch (error) {
      res.status(400).json({ error: 'Dados inválidos' });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = idSchema.parse(req.params);
      const data = petSchema.partial().parse(req.body);
      const pet = await PetService.update(id, data);
      res.json(pet);
    } catch (error) {
      res.status(400).json({ error: 'Dados inválidos' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = idSchema.parse(req.params);
      await PetService.delete(id);
      res.json({ message: 'Pet deletado' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar pet' });
    }
  }
}