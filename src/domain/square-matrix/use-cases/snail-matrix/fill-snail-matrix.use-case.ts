import { SquareMatrix } from '../../entities/square-matrix.entity';

interface IFillSnailMatrixUseCase {
  execute(matrix: SquareMatrix): void;
}

export class FillSnailMatrix implements IFillSnailMatrixUseCase {
  execute(matrix: SquareMatrix): void {
    const size = matrix.size;
    let counter = 1;
    let top = 0;
    let bottom = size - 1;
    let left = 0;
    let right = size - 1;

    while (top <= bottom && left <= right) {
      for (let i = left; i <= right; i++) matrix.setValue({ row: top, col: i, value: counter++ });
      top++;

      for (let i = top; i <= bottom; i++) matrix.setValue({ row: i, col: right, value: counter++ });
      right--;

      if (top <= bottom) {
        for (let i = right; i >= left; i--)
          matrix.setValue({ row: bottom, col: i, value: counter++ });
        bottom--;
      }

      if (left <= right) {
        for (let i = bottom; i >= top; i--)
          matrix.setValue({ row: i, col: left, value: counter++ });
        left++;
      }
    }
  }
}
