import { Request, Response } from 'express';

export class HealthController {
  check = (_req: Request, res: Response): void => {
    res.status(200).json({
      message: "API is running",
      status: 'ok',
      timestamp: new Date().toISOString(),
    });
  };
}


