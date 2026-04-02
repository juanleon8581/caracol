import { describe, beforeEach, expect, it } from 'vitest';
import { GenerateSquareMatrixDto } from '@/domain/square-matrix/dtos/generate-square-matrix.dto';
import { SquareMatrixService } from '@/infrastructure/services/square-matrix.service';

function makeDto(size: number): GenerateSquareMatrixDto {
  const [, dto] = GenerateSquareMatrixDto.create({ size });
  return dto!;
}

describe('SquareMatrixService', () => {
  let service: SquareMatrixService;

  beforeEach(() => {
    service = new SquareMatrixService();
  });

  describe('generate', () => {
    it('should create a SquareMatrix with the correct size', () => {
      // Arrange
      const dto = makeDto(3);

      // Act
      const matrix = service.generate(dto);

      // Assert
      expect(matrix.size).toBe(3);
    });

    it('should initialize all cells to zero', () => {
      // Arrange
      const dto = makeDto(3);

      // Act
      const matrix = service.generate(dto);

      // Assert
      expect(
        matrix
          .getMatrix()
          .flat()
          .every(v => v === 0),
      ).toBe(true);
    });
  });

  describe('generateSnail', () => {
    it('should return a 3x3 matrix filled in snail order', () => {
      // Act
      const matrix = service.generateSnail(makeDto(3));

      // Assert
      expect(matrix.getMatrix()).toEqual([
        [1, 2, 3],
        [8, 9, 4],
        [7, 6, 5],
      ]);
    });

    it('should fill all cells with values 1 to size²', () => {
      // Arrange
      const size = 4;

      // Act
      const matrix = service.generateSnail(makeDto(size));
      const flat = matrix.getMatrix().flat();

      // Assert
      expect(flat.sort((a, b) => a - b)).toEqual(
        Array.from({ length: size * size }, (_, i) => i + 1),
      );
    });
  });

  describe('getSquareMatrix', () => {
    it('should return the matrix as a 2D number array', () => {
      // Arrange
      const matrix = service.generate(makeDto(3));

      // Act
      const result = service.getSquareMatrix(matrix);

      // Assert
      expect(result).toHaveLength(3);
      expect(result.every(row => row.length === 3)).toBe(true);
    });
  });

  describe('getDiagonal', () => {
    it('should return the main diagonal after snail fill', () => {
      // Arrange
      const matrix = service.generateSnail(makeDto(3));

      // Act
      const diagonal = service.getDiagonal(matrix);

      // Assert
      // 3x3 snail: top-left=1, center=9, bottom-right=5
      expect(diagonal).toEqual([1, 9, 5]);
    });
  });

  describe('getReverseDiagonal', () => {
    it('should return the reverse-diagonal after snail fill', () => {
      // Arrange
      const matrix = service.generateSnail(makeDto(3));

      // Act
      const reverseDiagonal = service.getReverseDiagonal(matrix);

      // Assert
      // 3x3 snail: [0,2]=3, [1,1]=9, [2,0]=7
      expect(reverseDiagonal).toEqual([3, 9, 7]);
    });
  });
});
