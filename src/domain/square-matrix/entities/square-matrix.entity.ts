import type { GenerateSquareMatrixDto } from '../dtos/generate-square-matrix.dto';

type TSetValue = Record<'row' | 'col' | 'value', number>;

interface IMatrixCoordinates {
  row: number;
  col: number;
}

export class SquareMatrix {
  private readonly _matrix: number[][];
  private readonly _size: number;

  constructor(props: GenerateSquareMatrixDto) {
    const { size } = props;
    this._size = size;
    this._matrix = Array.from({ length: size }, () => Array(size).fill(0));
  }

  get size(): number {
    return this._size;
  }

  public setValue({ row, col, value }: TSetValue): void {
    if (!this._isValidPosition({ row, col })) throw new Error('Invalid position');

    this._matrix[row][col] = value;
  }

  public getValue({ row, col }: IMatrixCoordinates): number {
    if (!this._isValidPosition({ row, col })) throw new Error('Invalid position');

    return this._matrix[row][col];
  }

  public getMatrix(): number[][] {
    //* Retornamos una copia a doble nivel para evitar mutaciones externas
    return this._matrix.map(row => [...row]);
  }

  public getDiagonal(): number[] {
    const diagonal: number[] = [];
    for (let i = 0; i < this._size; i++) {
      diagonal.push(this._matrix[i][i]);
    }
    return diagonal;
  }

  public getReverseDiagonal(): number[] {
    const reverseDiagonal: number[] = [];
    const limit = this._size - 1;
    for (let i = 0; i <= limit; i++) {
      reverseDiagonal.push(this._matrix[i][limit - i]);
    }
    return reverseDiagonal;
  }

  private _isValidPosition({ row, col }: IMatrixCoordinates): boolean {
    return row >= 0 && row < this.size && col >= 0 && col < this.size;
  }
}
