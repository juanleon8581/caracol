import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { Server } from '@/presentation/server';
import { AppRoutes } from '@/presentation/routes';

describe('CaracolController', () => {
  let app: ReturnType<Server['getApp']>;

  beforeAll(() => {
    const server = new Server({ port: 0, routes: AppRoutes.routes });
    app = server.getApp();
  });

  describe('GET /api/caracol/:size', () => {
    it('should return a 3x3 snail matrix with diagonals', async () => {
      // Arrange & Act
      const res = await request(app).get('/api/caracol/3');

      // Assert
      expect(res.status).toBe(200);
      expect(res.body.matrix).toEqual([
        [1, 2, 3],
        [8, 9, 4],
        [7, 6, 5],
      ]);
      expect(res.body.diagonal).toEqual([1, 9, 5]);
      expect(res.body.reverseDiagonal).toEqual([3, 9, 7]);
    });

    it('should return a 5x5 snail matrix with diagonals', async () => {
      // Arrange & Act
      const res = await request(app).get('/api/caracol/5');

      // Assert
      expect(res.status).toBe(200);
      expect(res.body.matrix).toHaveLength(5);
      expect(res.body.matrix.every((row: number[]) => row.length === 5)).toBe(true);
      expect(res.body.diagonal).toHaveLength(5);
      expect(res.body.reverseDiagonal).toHaveLength(5);
    });

    it('should return 400 for size below minimum (2)', async () => {
      // Arrange & Act
      const res = await request(app).get('/api/caracol/2');

      // Assert
      expect(res.status).toBe(400);
      expect(res.body.message).toBeDefined();
    });

    it('should return 400 for size above maximum (16)', async () => {
      // Arrange & Act
      const res = await request(app).get('/api/caracol/16');

      // Assert
      expect(res.status).toBe(400);
      expect(res.body.message).toBeDefined();
    });

    it('should return 400 for a non-numeric size', async () => {
      // Arrange & Act
      const res = await request(app).get('/api/caracol/abc');

      // Assert
      expect(res.status).toBe(400);
      expect(res.body.message).toBeDefined();
    });

    it('should return 400 for a decimal size', async () => {
      // Arrange & Act
      const res = await request(app).get('/api/caracol/3.5');

      // Assert
      expect(res.status).toBe(400);
      expect(res.body.message).toBeDefined();
    });
  });
});
