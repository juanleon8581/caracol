import { describe, expect, it } from 'vitest';
import { GenerateSquareMatrixDto } from '@/domain/square-matrix/dtos/generate-square-matrix.dto';
import { SquareMatrix } from '@/domain/square-matrix/entities/square-matrix.entity';
import { FillSnailMatrix } from '@/domain/square-matrix/use-cases/snail-matrix/fill-snail-matrix.use-case';

const SIZES = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

function makeFilledMatrix(size: number): number[][] {
  const [, dto] = GenerateSquareMatrixDto.create({ size });
  const matrix = new SquareMatrix(dto!);
  new FillSnailMatrix().execute(matrix);
  return matrix.getMatrix();
}

describe('FillSnailMatrix', () => {
  describe('execute', () => {
    it.each(SIZES)('should fill all cells with values 1 to size² for size %i', size => {
      // Arrange & Act
      const matrix = makeFilledMatrix(size);
      const flat = matrix.flat();
      const expected = Array.from({ length: size * size }, (_, i) => i + 1);

      // Assert
      expect(flat.sort((a, b) => a - b)).toEqual(expected);
    });

    it.each(SIZES)('should have no repeated values for size %i', size => {
      // Arrange & Act
      const flat = makeFilledMatrix(size).flat();

      // Assert
      expect(new Set(flat).size).toBe(size * size);
    });

    it.each(SIZES)('should place 1 at the top-left corner for size %i', size => {
      // Arrange & Act
      const matrix = makeFilledMatrix(size);

      // Assert
      expect(matrix[0][0]).toBe(1);
    });

    it.each(SIZES)('should fill the first row sequentially (1 to size) for size %i', size => {
      // Arrange & Act
      const matrix = makeFilledMatrix(size);
      const firstRow = matrix[0];
      const expected = Array.from({ length: size }, (_, i) => i + 1);

      // Assert
      expect(firstRow).toEqual(expected);
    });

    it.each(SIZES)(
      'should fill the right column sequentially after the first row for size %i',
      size => {
        // Arrange & Act
        const matrix = makeFilledMatrix(size);
        const rightCol = matrix.slice(1).map(row => row[size - 1]);
        const expected = Array.from({ length: size - 1 }, (_, i) => size + 1 + i);

        // Assert
        expect(rightCol).toEqual(expected);
      },
    );

    it('should produce the correct 3x3 snail pattern', () => {
      // Arrange & Act
      const matrix = makeFilledMatrix(3);

      // Assert
      expect(matrix).toEqual([
        [1, 2, 3],
        [8, 9, 4],
        [7, 6, 5],
      ]);
    });

    it('should produce the correct 4x4 snail pattern', () => {
      // Arrange & Act
      const matrix = makeFilledMatrix(4);

      // Assert
      expect(matrix).toEqual([
        [1, 2, 3, 4],
        [12, 13, 14, 5],
        [11, 16, 15, 6],
        [10, 9, 8, 7],
      ]);
    });
  });
});
