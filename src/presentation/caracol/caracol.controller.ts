import { Request, Response } from 'express';
import { GenerateSquareMatrixDto } from '@/domain/square-matrix/dtos/generate-square-matrix.dto';
import { CustomError } from '@/domain/shared/errors/custom.error';
import { SquareMatrixService } from '@/infrastructure/services/square-matrix.service';

export class CaracolController {
  constructor(private readonly service: SquareMatrixService) {}

  generate = (req: Request, res: Response): void => {
    try {
      const size = Number(req.params.size);
      const [error, dto] = GenerateSquareMatrixDto.create({ size });

      if (error) throw CustomError.badRequest(error);

      const matrix = this.service.generateSnail(dto!);

      res.status(200).json({
        matrix: this.service.getSquareMatrix(matrix),
        diagonal: this.service.getDiagonal(matrix),
        reverseDiagonal: this.service.getReverseDiagonal(matrix),
      });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}
