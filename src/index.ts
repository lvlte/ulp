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
    if (x <= FLOAT64_MIN) {
      return Number.MIN_VALUE;
    }
    return 2**(_exponent(x) - 52);
  }
  return NaN;
}

/**
 * @borrows eps as ulp
 */
export const ulp = eps;

/**
 * Exponent of a normalized floating-point number x.
 *
 * @param x The input number
 * @returns The largest integer `y` such that `2^y ≤ |x|`, or `NaN` if x is not
 * a finite number / if x is ±0.
 */
export function exponent(x: number): number {
  if (Number.isFinite(x) && x !== 0) {
    return _exponent(Math.abs(x));
  }
  return NaN;
}

function _exponent(x: number): number {
  // `Math.log2()` is not precise enough.
  const s = x.toString(2);
  return x < 1 ? -(s.split('1', 1)[0].length - 1) : s.split('.', 1)[0].length - 1;
}
