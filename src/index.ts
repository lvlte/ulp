/**
 * The smallest positive normal number representable by IEEE-754 float64.
 */
export const FLOAT64_MIN = 2**-1022;

/**
 * Return the unit in the last place or unit of least precision (ulp) of x, that
 * is, the distance between two consecutive representable floating-point numbers
 * at x. If x is a power of 2, the distance on either side of x is different, in
 * which case the larger distance is returned.
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
 * @returns The largest integer `y` such that `2^y ≤ |x|`. If `x` is not a
 * finite number or equals ±0, returns `NaN`.
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

/**
 * Return the smallest representable floating-point number that comes after `x`
 * on the float64 number line (towards +∞).
 *
 * @param x The input number
 * @returns The smallest floating-point number `y` such that `y > x`. If `x` is
 * `±Infinity` or `NaN`, returns `x`.
 */
export function nextFloat(x: number): number {
  switch(x) {
    case -Infinity:
      return -Number.MAX_VALUE;

    case Infinity:
    case Number.MAX_VALUE:
      return Infinity;

    case -Number.MIN_VALUE:
      return -0;

    default:
      if (!Number.isFinite(x)) {
        return NaN;
      }
  }

  const e = eps(x);
  const y = x + e/2; // powers of 2 have 2 different distances on either side

  return y > x ? y : x + e;
}

/**
 * Return the largest representable floating-point number that comes before `x`
 * on the float64 number line (towards -∞).
 *
 * @param x The input number
 * @returns The largest floating-point number `y` such that `y < x`. If `x` is
 * `±Infinity` or `NaN`, returns `x`.
 */
export function prevFloat(x: number): number {
  // Prevent type coercion
  return typeof x === 'number' ? -nextFloat(-x) : NaN;
}
