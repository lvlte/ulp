import { modf } from '@lvlte/modf';

/**
 * The smallest positive normal number representable by IEEE-754 float64.
 */
export const FLOAT64_MIN = 2**-1022;

/**
 * Return the unit in the last place or unit of least precision (ulp) of x, that
 * is, the distance between two consecutive representable floating-point numbers
 * at x.
 *
 * @param x The input number (default: 1)
 * @returns The ulp of x, or `NaN` if `x` is not a finite number.
 */
export function eps(x: number = 1): number {
  if (Number.isFinite(x)) {
    x = Math.abs(x);
    if (x >= FLOAT64_MIN) {
      const exp = exponent(x);
      return Number.EPSILON * 2**exp;
    }
    return Number.MIN_VALUE;
  }
  return NaN
}

/**
 * Exponent of a normalized floating-point number x (`Math.log2()` not precise
 * enough for large numbers).
 *
 * NB. This function assumes `x` is a finite, strictly positive number.
 *
 * @param x The input number
 * @returns The largest integer `y` such that `2^y ≤ x`.
 */
export function exponent(x: number): number {
  const [ipart, fpart] = modf(x);
  if (ipart > 0) {
    return ipart.toString(2).split('.', 1)[0].length - 1;
  }
  return -(fpart.toString(2).split('1', 1)[0].length - 1);
}
