import { Request, Response } from 'express';
import { ServicoService } from '../services/ServicoService';
import { servicoSchema, idSchema } from '../validations/servicoValidation';

export class ServicoController {
  /**
   * @swagger
   * /servicos:
   *   get:
   *     summary: Listar todos os serviços
   *     tags: [Serviços]
   *     responses:
   *       200:
   *         description: Lista de serviços retornada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Servico'
   *             example:
   *               - id: 1
   *                 tipo: "Banho"
   *                 preco: 50.00
   *                 realizado: false
   *                 clienteId: 1
   *                 petId: 1
   *               - id: 2
   *                 tipo: "Tosa"
   *                 preco: 80.00
   *                 realizado: true
   *                 clienteId: 1
   *                 petId: 1
   *       500:
   *         description: Erro interno do servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  static async index(req: Request, res: Response) {
    try {
      const servicos = await ServicoService.findAll();
      res.json(servicos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar serviços' });
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const { id } = idSchema.parse(req.params);
      const servico = await ServicoService.findById(id);
      if (!servico) return res.status(404).json({ error: 'Serviço não encontrado' });
      res.json(servico);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar serviço' });
    }
  }

  /**
   * @swagger
   * /servicos:
   *   post:
   *     summary: Criar novo serviço
   *     tags: [Serviços]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - tipo
   *               - preco
   *               - clienteId
   *             properties:
   *               tipo:
   *                 type: string
   *                 example: "Banho e Tosa"
   *                 description: Tipo do serviço
   *               preco:
   *                 type: number
   *                 format: float
   *                 example: 80.00
   *                 description: Preço do serviço em reais
   *               clienteId:
   *                 type: integer
   *                 example: 1
   *                 description: ID do cliente
   *               petId:
   *                 type: integer
   *                 example: 1
   *                 description: ID do pet (opcional)
   *     responses:
   *       201:
   *         description: Serviço criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Servico'
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
      const data = servicoSchema.parse(req.body);
      const servico = await ServicoService.create(data);
      res.status(201).json(servico);
    } catch (error) {
      res.status(400).json({ error: 'Dados inválidos' });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = idSchema.parse(req.params);
      const data = servicoSchema.partial().parse(req.body);
      const servico = await ServicoService.update(id, data);
      res.json(servico);
    } catch (error) {
      res.status(400).json({ error: 'Dados inválidos' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = idSchema.parse(req.params);
      await ServicoService.delete(id);
      res.json({ message: 'Serviço deletado' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar serviço' });
    }
  }

  static async marcarRealizado(req: Request, res: Response) {
    try {
      const { id } = idSchema.parse(req.params);
      const servico = await ServicoService.marcarRealizado(id);
      res.json(servico);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao marcar como realizado' });
    }
  }
}