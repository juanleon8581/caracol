import { describe, expect, it } from 'vitest';
import { GenerateSquareMatrixDto } from '@/domain/square-matrix/dtos/generate-square-matrix.dto';

describe('GenerateSquareMatrixDto', () => {
  describe('create', () => {
    describe('when size is valid', () => {
      it('should create a dto with the minimum valid size (3)', () => {
        // Arrange & Act
        const [error, dto] = GenerateSquareMatrixDto.create({ size: 3 });

        // Assert
        expect(error).toBeUndefined();
        expect(dto).toBeDefined();
        expect(dto!.size).toBe(3);
      });

      it('should create a dto with the maximum valid size (15)', () => {
        // Arrange & Act
        const [error, dto] = GenerateSquareMatrixDto.create({ size: 15 });

        // Assert
        expect(error).toBeUndefined();
        expect(dto).toBeDefined();
        expect(dto!.size).toBe(15);
      });

      it('should create a dto with a size in the middle of the range', () => {
        // Arrange & Act
        const [error, dto] = GenerateSquareMatrixDto.create({ size: 9 });

        // Assert
        expect(error).toBeUndefined();
        expect(dto!.size).toBe(9);
      });

      it('should return a frozen dto', () => {
        // Arrange & Act
        const [, dto] = GenerateSquareMatrixDto.create({ size: 5 });

        // Assert
        expect(Object.isFrozen(dto)).toBe(true);
      });
    });

    describe('when size is not an integer', () => {
      it('should return an error for a decimal number', () => {
        // Arrange & Act
        const [error, dto] = GenerateSquareMatrixDto.create({ size: 3.5 });

        // Assert
        expect(error).toBe('Size must be an integer');
        expect(dto).toBeUndefined();
      });

      it('should return an error for NaN', () => {
        // Arrange & Act
        const [error, dto] = GenerateSquareMatrixDto.create({ size: NaN });

        // Assert
        expect(error).toBe('Size must be an integer');
        expect(dto).toBeUndefined();
      });

      it('should return an error for Infinity', () => {
        // Arrange & Act
        const [error, dto] = GenerateSquareMatrixDto.create({ size: Infinity });

        // Assert
        expect(error).toBe('Size must be an integer');
        expect(dto).toBeUndefined();
      });
    });

    describe('when size is out of range', () => {
      it('should return an error for size below the minimum (2)', () => {
        // Arrange & Act
        const [error, dto] = GenerateSquareMatrixDto.create({ size: 2 });

        // Assert
        expect(error).toBe('Size must be between 3 and 15');
        expect(dto).toBeUndefined();
      });

      it('should return an error for size above the maximum (16)', () => {
        // Arrange & Act
        const [error, dto] = GenerateSquareMatrixDto.create({ size: 16 });

        // Assert
        expect(error).toBe('Size must be between 3 and 15');
        expect(dto).toBeUndefined();
      });

      it('should return an error for a negative number', () => {
        // Arrange & Act
        const [error, dto] = GenerateSquareMatrixDto.create({ size: -1 });

        // Assert
        expect(error).toBe('Size must be between 3 and 15');
        expect(dto).toBeUndefined();
      });
    });
  });
});
