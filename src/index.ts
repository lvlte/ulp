/**
 * Effective number of bits in the significand of a Float64 number (52 + 1, the
 * leftmost 1 does not need to be stored, which leaves 1 sign bit and 11 bits
 * for the exponent).
 */
export const FLOAT64_PRECISION = 53;

/**
 * Minimum exponent of a normal Float64 number.
 *
 * For subnormals, the value is `FLOAT64_EMIN - FLOAT64_PRECISION + 1 = -1074`.
 */
export const FLOAT64_EMIN = -1022;

/**
 * Maximum exponent of a normal Float64 number.
 */
export const FLOAT64_EMAX = 1023;

/**
 * Smallest positive normal Float64 number (`FLOAT64_MIN = 2^-1022`).
 *
 * See also {@link Number.MIN_VALUE|`Number.MIN_VALUE`}, the absolute smallest
 * subnormal (`2**-1074 ≈ 5e-308`).
 */
export const FLOAT64_MIN = 2.2250738585072014e-308;
const _FLOAT64_MIN_2 = 2*FLOAT64_MIN;

/**
 * Largest positive finite Float64 number `FLOAT64_MAX = 2^1023 * (2 - 2^-52)`
 *
 * @see {@link Number.MAX_VALUE|`Number.MAX_VALUE`}.
 */
export const FLOAT64_MAX = 1.7976931348623157e+308;

/**
 * Machine epsilon of a Float64 number, the gap between 1 and the next largest
 * value representable by Float64 (`FLOAT64_EPS = 2^-52`).
 *
 * @see {@link Number.EPSILON|`Number.EPSILON`}.
 */
export const FLOAT64_EPS = 2.220446049250313e-16;

const ϕ = 2**52 + 1;
const _1p = 1 + Number.EPSILON;
const _1m = 1 - Number.EPSILON/2;

/**
 * Maximum absolute value of `x` that can be passed to `_ufp(x)`.
 */
const ufp_xmax = FLOAT64_MAX/ϕ;

/**
 * `2^(1023 - 52)`
 *
 * Fallback for `eps(x)` in case `_1m * (_1p * x)` overflows.
 */
const epsx_overflow = 2**971;

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
    if (x < _FLOAT64_MIN_2) {
      return Number.MIN_VALUE;
    }
    const q = _1p * x;
    return q - _1m*q || epsx_overflow;
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
