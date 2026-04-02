interface IGenerateSquareMatrixDto {
  size: number;
}

export class GenerateSquareMatrixDto {
  private constructor(public readonly size: number) {
    Object.freeze(this);
  }

  static create(props: IGenerateSquareMatrixDto): [string?, GenerateSquareMatrixDto?] {
    const { size } = props;

    const isIntNumber = Number.isInteger(size);
    if (!isIntNumber) {
      return ['Size must be an integer', undefined];
    }

    const isOnRange = size >= 3 && size <= 15;
    if (!isOnRange) {
      return ['Size must be between 3 and 15', undefined];
    }

    return [undefined, new GenerateSquareMatrixDto(size)];
  }
}
