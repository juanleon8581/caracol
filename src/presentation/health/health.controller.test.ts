import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { Server } from '@/presentation/server';

describe('HealthController', () => {
  let app: ReturnType<Server['getApp']>;

  beforeAll(() => {
    const server = new Server({ port: 0 });
    app = server.getApp();
  });

  describe('GET /api/health', () => {
    it('should return status ok with a timestamp', async () => {
      const res = await request(app).get('/api/health');

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.timestamp).toBeDefined();
    });
  });
});
