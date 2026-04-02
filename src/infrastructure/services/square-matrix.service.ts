import { GenerateSquareMatrixDto } from '@/domain/square-matrix/dtos/generate-square-matrix.dto';
import { SquareMatrix } from '@/domain/square-matrix/entities/square-matrix.entity';
import { SquareMatrixRepository } from '@/domain/square-matrix/repositories/square-matrix.repository';
import { FillSnailMatrix } from '@/domain/square-matrix/use-cases/snail-matrix/fill-snail-matrix.use-case';

export class SquareMatrixService extends SquareMatrixRepository {
  private readonly fillSnailUseCase = new FillSnailMatrix();

  generate(dto: GenerateSquareMatrixDto): SquareMatrix {
    return new SquareMatrix(dto);
  }

  generateSnail(dto: GenerateSquareMatrixDto): SquareMatrix {
    const matrix = new SquareMatrix(dto);
    this.fillSnailUseCase.execute(matrix);
    return matrix;
  }

  getSquareMatrix(matrix: SquareMatrix): number[][] {
    return matrix.getMatrix();
  }

  getDiagonal(matrix: SquareMatrix): number[] {
    return matrix.getDiagonal();
  }

  getReverseDiagonal(matrix: SquareMatrix): number[] {
    return matrix.getReverseDiagonal();
  }
}
