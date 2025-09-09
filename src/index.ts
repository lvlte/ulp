import { modf } from '@lvlte/modf';

export const FLOAT64_MIN = 2**-1022;

export function eps(x: number = 1): number {
  if (Number.isFinite(x)) {
    x = Math.abs(x);
    if (x >= FLOAT64_MIN) {
      // Math.log2() is not precise enough for large numbers
      const exp = exponent(x);
      return Number.EPSILON * 2**exp;
    }
    return Number.MIN_VALUE;
  }
  return NaN
}

export function exponent(x: number): number {
  const [ipart, fpart] = modf(x);
  if (ipart > 0) {
    return ipart.toString(2).split('.', 1)[0].length - 1;
  }
  return -(fpart.toString(2).split('1', 1)[0].length - 1);
}
