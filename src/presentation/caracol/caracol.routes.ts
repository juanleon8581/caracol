import { Router, IRouter } from 'express';
import { SquareMatrixService } from '@/infrastructure/services/square-matrix.service';
import { CaracolController } from '@/presentation/caracol/caracol.controller';

export const caracolRouter: IRouter = Router();
const controller = new CaracolController(new SquareMatrixService());

/**
 * @swagger
 * /api/caracol/{size}:
 *   get:
 *     summary: Generate a snail-filled square matrix
 *     tags: [Caracol]
 *     parameters:
 *       - in: path
 *         name: size
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 3
 *           maximum: 15
 *         description: Size of the square matrix (3–15)
 *     responses:
 *       200:
 *         description: Matrix generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 matrix:
 *                   type: array
 *                   items:
 *                     type: array
 *                     items:
 *                       type: integer
 *                   example: [[1,2,3],[8,9,4],[7,6,5]]
 *                 diagonal:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   example: [1,9,5]
 *                 reverseDiagonal:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   example: [3,9,7]
 *       400:
 *         description: Invalid size
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
caracolRouter.get('/:size', controller.generate);
