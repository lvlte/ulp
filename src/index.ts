
const FLOAT64_MIN = 2**-1022;

export function eps(x: number = 1): number {
  if (Number.isFinite(x)) {
    if (Math.abs(x) >= FLOAT64_MIN) {
      const exponent = Math.floor(Math.log2(Math.abs(x)));
      return Number.EPSILON * 2**exponent;
    }
    return Number.MIN_VALUE;
  }
  return NaN
}

