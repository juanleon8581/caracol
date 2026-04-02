import { GenerateSquareMatrixDto } from '../dtos/generate-square-matrix.dto';
import { SquareMatrix } from '../entities/square-matrix.entity';

export abstract class SquareMatrixRepository {
  abstract generate(dto: GenerateSquareMatrixDto): SquareMatrix;
  abstract generateSnail(dto: GenerateSquareMatrixDto): SquareMatrix;
  abstract getSquareMatrix(matrix: SquareMatrix): number[][];
  abstract getDiagonal(matrix: SquareMatrix): number[];
  abstract getReverseDiagonal(matrix: SquareMatrix): number[];
}
