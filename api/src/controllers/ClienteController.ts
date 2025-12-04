import { Request, Response } from 'express';


import { ClienteService } from '../services/ClienteService';
import { clienteSchema, idSchema } from '../validations/clienteValidation';

export class ClienteController {
  /**
   * @swagger
   * /clientes:
   *   get:
   *     summary: Listar todos os clientes
   *     tags: [Clientes]
   *     responses:
   *       200:
   *         description: Lista de clientes
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Cliente'
   *       500:
   *         description: Erro interno
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  static async index(req: Request, res: Response) {
    try {
      const clientes = await ClienteService.findAll();
      res.json(clientes);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar clientes' });
    }
  }

  /**
   * @swagger
   * /clientes/{id}:
   *   get:
   *     summary: Buscar cliente por ID
   *     tags: [Clientes]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do cliente
   *     responses:
   *       200:
   *         description: Cliente encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Cliente'
   *       404:
   *         description: Cliente não encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  static async show(req: Request, res: Response) {
    try {
      const { id } = idSchema.parse(req.params);
      const cliente = await ClienteService.findById(id);
      if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
      res.json(cliente);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar cliente' });
    }
  }

  /**
   * @swagger
   * /clientes:
   *   post:
   *     summary: Criar novo cliente
   *     tags: [Clientes]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Cliente'
   *     responses:
   *       201:
   *         description: Cliente criado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Cliente'
   *       400:
   *         description: Dados inválidos
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  static async store(req: Request, res: Response) {
    try {
      const data = clienteSchema.parse(req.body);
      const cliente = await ClienteService.create(data);
      res.status(201).json(cliente);
    } catch (error) {
      res.status(400).json({ error: 'Dados inválidos' });
    }
  }

  /**
   * @swagger
   * /clientes/{id}:
   *   put:
   *     summary: Atualizar cliente
   *     tags: [Clientes]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do cliente
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Cliente'
   *     responses:
   *       200:
   *         description: Cliente atualizado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Cliente'
   *       400:
   *         description: Dados inválidos
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  static async update(req: Request, res: Response) {
    try {
      const { id } = idSchema.parse(req.params);
      const data = clienteSchema.partial().parse(req.body);
      const cliente = await ClienteService.update(id, data);
      res.json(cliente);
    } catch (error) {
      res.status(400).json({ error: 'Dados inválidos' });
    }
  }

  /**
   * @swagger
   * /clientes/{id}:
   *   delete:
   *     summary: Deletar cliente
   *     tags: [Clientes]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do cliente
   *     responses:
   *       200:
   *         description: Cliente deletado
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Cliente deletado"
   *       500:
   *         description: Erro interno
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  static async delete(req: Request, res: Response) {
    try {
      const { id } = idSchema.parse(req.params);
      await ClienteService.delete(id);
      res.json({ message: 'Cliente deletado' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar cliente' });
    }
  }
}
