import { describe, expect, it } from 'vitest';
import { GenerateSquareMatrixDto } from '@/domain/square-matrix/dtos/generate-square-matrix.dto';
import { SquareMatrix } from '@/domain/square-matrix/entities/square-matrix.entity';

function makeDto(size: number): GenerateSquareMatrixDto {
  const [, dto] = GenerateSquareMatrixDto.create({ size });
  return dto!;
}

describe('SquareMatrixEntity', () => {
  describe('constructor', () => {
    it('should expose the correct size', () => {
      // Arrange & Act
      const entity = new SquareMatrix(makeDto(3));

      // Assert
      expect(entity.size).toBe(3);
    });

    it('should initialize all cells to zero', () => {
      // Arrange & Act
      const entity = new SquareMatrix(makeDto(3));

      // Assert
      const matrix = entity.getMatrix();
      expect(matrix.every(row => row.every(cell => cell === 0))).toBe(true);
    });
  });

  describe('setValue', () => {
    it('should set a value at a valid position', () => {
      // Arrange
      const entity = new SquareMatrix(makeDto(3));

      // Act
      entity.setValue({ row: 1, col: 2, value: 42 });

      // Assert
      expect(entity.getValue({ row: 1, col: 2 })).toBe(42);
    });

    it('should throw for a negative row', () => {
      // Arrange
      const entity = new SquareMatrix(makeDto(3));

      // Act & Assert
      expect(() => entity.setValue({ row: -1, col: 0, value: 1 })).toThrow('Invalid position');
    });

    it('should throw for a row >= size', () => {
      // Arrange
      const entity = new SquareMatrix(makeDto(3));

      // Act & Assert
      expect(() => entity.setValue({ row: 3, col: 0, value: 1 })).toThrow('Invalid position');
    });

    it('should throw for a negative col', () => {
      // Arrange
      const entity = new SquareMatrix(makeDto(3));

      // Act & Assert
      expect(() => entity.setValue({ row: 0, col: -1, value: 1 })).toThrow('Invalid position');
    });

    it('should throw for a col >= size', () => {
      // Arrange
      const entity = new SquareMatrix(makeDto(3));

      // Act & Assert
      expect(() => entity.setValue({ row: 0, col: 3, value: 1 })).toThrow('Invalid position');
    });
  });

  describe('getValue', () => {
    it('should return the value previously set at a position', () => {
      // Arrange
      const entity = new SquareMatrix(makeDto(3));
      entity.setValue({ row: 0, col: 1, value: 7 });

      // Act
      const value = entity.getValue({ row: 0, col: 1 });

      // Assert
      expect(value).toBe(7);
    });

    it('should return 0 for an untouched cell', () => {
      // Arrange
      const entity = new SquareMatrix(makeDto(3));

      // Act
      const value = entity.getValue({ row: 2, col: 2 });

      // Assert
      expect(value).toBe(0);
    });

    it('should throw for an invalid position', () => {
      // Arrange
      const entity = new SquareMatrix(makeDto(3));

      // Act & Assert
      expect(() => entity.getValue({ row: 5, col: 0 })).toThrow('Invalid position');
    });
  });

  describe('getMatrix', () => {
    it('should return a matrix with correct dimensions', () => {
      // Arrange
      const entity = new SquareMatrix(makeDto(4));

      // Act
      const matrix = entity.getMatrix();

      // Assert
      expect(matrix).toHaveLength(4);
      expect(matrix.every(row => row.length === 4)).toBe(true);
    });

    it('should return a deep copy — mutating it does not affect the entity', () => {
      // Arrange
      const entity = new SquareMatrix(makeDto(3));
      const copy = entity.getMatrix();

      // Act
      copy[0][0] = 999;

      // Assert
      expect(entity.getValue({ row: 0, col: 0 })).toBe(0);
    });
  });

  describe('getDiagonal', () => {
    it('should return the main diagonal values (top-left to bottom-right)', () => {
      // Arrange
      const entity = new SquareMatrix(makeDto(3));
      entity.setValue({ row: 0, col: 0, value: 1 });
      entity.setValue({ row: 1, col: 1, value: 5 });
      entity.setValue({ row: 2, col: 2, value: 9 });

      // Act
      const diagonal = entity.getDiagonal();

      // Assert
      expect(diagonal).toEqual([1, 5, 9]);
    });
  });

  describe('getReverseDiagonal', () => {
    it('should return the reverse-diagonal values (top-right to bottom-left)', () => {
      // Arrange — 5x5 matrix filled with 1–25
      const entity = new SquareMatrix(makeDto(5));
      let value = 1;
      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
          entity.setValue({ row: r, col: c, value: value++ });
        }
      }
      // Row 0: [1,2,3,4,5], Row 1: [6,7,8,9,10], ...
      // reverse-diagonal: [0,4]=5, [1,3]=9, [2,2]=13, [3,1]=17, [4,0]=21

      // Act
      const reverseDiagonal = entity.getReverseDiagonal();

      // Assert
      expect(reverseDiagonal).toEqual([5, 9, 13, 17, 21]);
    });
  });
});
