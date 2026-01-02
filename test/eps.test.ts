import { eps, exponent, FLOAT64_MIN, prevFloat, nextFloat } from '../src/index';

describe('Exponent accuracy', () => {
  test('exponent(2^x - ε) === x - 1', () => {
    expect(exponent(2**53)).toBe(53);
    expect(exponent(2**53 - 1)).toBe(52);
    expect(exponent(2**52 - 0.5)).toBe(51);
    expect(exponent(2**51 - 0.25)).toBe(50);
    expect(exponent(2**50 - 0.125)).toBe(49);
    expect(exponent(2**1000 - Number.EPSILON * 2**1000)).toBe(999);
    expect(exponent(1)).toBe(0);
    expect(exponent(1 - Number.EPSILON)).toBe(-1);
    expect(exponent(0.5)).toBe(-1);
    expect(exponent(0.5 - Number.EPSILON/2)).toBe(-2);
    expect(exponent(2**-1000 - Number.EPSILON/2**1000)).toBe(-1001);
  });

  test('exponent(Number.MAX_VALUE) === 1023', () => {
    expect(exponent(Number.MAX_VALUE)).toBe(1023);
  });

  test('exponent(FLOAT64_MIN) === -1022', () => {
    expect(exponent(FLOAT64_MIN)).toBe(-1022);
  });

  test('exponent(Number.MIN_VALUE) === -1074', () => {
    expect(exponent(Number.MIN_VALUE)).toBe(-1074);
  });
});

describe('Unit in the last place', () => {
  test('eps(2^53 - 1) === 1', () => {
    expect(eps(Number.MAX_SAFE_INTEGER)).toBe(1);
  });

  test('eps(2^53) === 2', () => {
    expect(eps(2**53)).toBe(2);
  });

  test('eps(0) === Number.MIN_VALUE', () => {
    expect(eps(0)).toBe(Number.MIN_VALUE);
  });

  test('eps(Number.MAX_VALUE) === 2^971', () => {
    expect(eps(Number.MAX_VALUE)).toBe(2**971);
  });

  test('eps(FLOAT64_MIN) === Number.MIN_VALUE', () => {
    expect(eps(FLOAT64_MIN)).toBe(Number.MIN_VALUE);
  });

  test('eps(<subnormal-number>) === Number.MIN_VALUE', () => {
    expect(eps(2**-1023)).toBe(Number.MIN_VALUE);
    expect(eps(2**-1047)).toBe(Number.MIN_VALUE);
    expect(eps(Number.MIN_VALUE)).toBe(Number.MIN_VALUE);
  });

  test('eps(<non-finite>) === NaN', () => {
    expect(eps(Infinity)).toBe(NaN);
    expect(eps(NaN)).toBe(NaN);
    ['abc', '1', null, {}, [], Symbol(), () => 0].forEach(x => {
      expect(eps(x as unknown as number)).toBe(NaN);
    });
  });
});

describe('Machine epsilon', () => {
  test('eps() === eps(1) === Number.EPSILON', () => {
    expect(eps()).toBe(eps(1));
    expect(eps(1)).toBe(Number.EPSILON);
  });
});

describe('Next/Previous Float', () => {
  test('Adjacent to Zero', () => {
    expect(nextFloat(0)).toBe(Number.MIN_VALUE);
    expect(nextFloat(-0)).toBe(Number.MIN_VALUE);
    expect(nextFloat(Number.MIN_VALUE)).toBe(Number.MIN_VALUE * 2);
    expect(nextFloat(-Number.MIN_VALUE)).toBe(-0);
    expect(nextFloat(-Number.MIN_VALUE * 2)).toBe(-Number.MIN_VALUE);

    expect(prevFloat(0)).toBe(-Number.MIN_VALUE);
    expect(prevFloat(-0)).toBe(-Number.MIN_VALUE);
    expect(prevFloat(-Number.MIN_VALUE)).toBe(-Number.MIN_VALUE * 2);
    expect(prevFloat(Number.MIN_VALUE)).toBe(0);
    expect(prevFloat(Number.MIN_VALUE * 2)).toBe(Number.MIN_VALUE);
  });

  test('Adjacent to ±Infinity', () => {
    expect(nextFloat(Number.MAX_VALUE)).toBe(Infinity);
    expect(nextFloat(Infinity)).toBe(Infinity);
    expect(nextFloat(-Infinity)).toBe(-Number.MAX_VALUE);

    expect(prevFloat(-Number.MAX_VALUE)).toBe(-Infinity);
    expect(prevFloat(-Infinity)).toBe(-Infinity);
    expect(prevFloat(Infinity)).toBe(Number.MAX_VALUE);
  });

  test('Subnormal/Normal Boundary', () => {
    expect(nextFloat(FLOAT64_MIN)).toBe(FLOAT64_MIN + Number.MIN_VALUE);
    expect(nextFloat(FLOAT64_MIN - Number.MIN_VALUE)).toBe(FLOAT64_MIN);
    expect(nextFloat(-FLOAT64_MIN)).toBe(-FLOAT64_MIN + Number.MIN_VALUE);
    expect(nextFloat(-FLOAT64_MIN - Number.MIN_VALUE)).toBe(-FLOAT64_MIN);

    expect(prevFloat(FLOAT64_MIN)).toBe(FLOAT64_MIN - Number.MIN_VALUE);
    expect(prevFloat(FLOAT64_MIN + Number.MIN_VALUE)).toBe(FLOAT64_MIN);
    expect(prevFloat(-FLOAT64_MIN)).toBe(-FLOAT64_MIN - Number.MIN_VALUE);
    expect(prevFloat(-FLOAT64_MIN + Number.MIN_VALUE)).toBe(-FLOAT64_MIN);
  });

  test('Powers of two', () => {
    expect(nextFloat(1)).toBe(1 + Number.EPSILON);
    expect(nextFloat(-1)).toBe(-1 + Number.EPSILON/2);
    expect(nextFloat(2**52)).toBe(2**52 + 1);
    expect(nextFloat(-(2**52))).toBe(-(2**52) + 0.5);
    expect(nextFloat(2**53)).toBe(2**53 + 2);
    expect(nextFloat(-(2**53))).toBe(-(2**53) + 1);

    expect(prevFloat(1)).toBe(1 - Number.EPSILON/2);
    expect(prevFloat(-1)).toBe(-1 - Number.EPSILON);
    expect(prevFloat(2**52)).toBe(2**52 - 0.5);
    expect(prevFloat(-(2**52))).toBe(-(2**52) - 1);
    expect(prevFloat(2**53)).toBe(2**53 - 1);
    expect(prevFloat(-(2**53))).toBe(-(2**53) - 2);
  });

  test('Not A Number', () => {
    [NaN, 'abc', '1', null, {}, [], Symbol(), () => 0].forEach(x => {
      expect(nextFloat(x as unknown as number)).toBe(NaN);
      expect(prevFloat(x as unknown as number)).toBe(NaN);
    });
  });
});
