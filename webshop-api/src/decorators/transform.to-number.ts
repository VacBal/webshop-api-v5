import { Transform, TransformFnParams } from 'class-transformer';

export function ToNumber(): (target: any, key: string) => void {
  return Transform(({ value }: TransformFnParams) => {
    if (value === undefined || value === null || typeof value === 'number') {
      return value;
    }
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      return numericValue;
    }
    return value;
  });
}
