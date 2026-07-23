# ulp

> A tiny module that allows, among other things, to :
> - Compute the [ULP](https://en.wikipedia.org/wiki/Unit_in_the_last_place)
    (unit in the last place) of a given IEEE-754 64-bit number: `ulp(x)`
    (alias: `eps(x)`).
> - Get the closest representable number that comes before/after it on the
    Float64 number line: `nextFloat(x)`, `prevFloat(x)`.
> - Compute the UFP (unit in the first place): `ufp(x)`.
> - Get the largest integer `y` such that `2^y ≤ |x|`: `exponent(x)`.


## Install

```sh
npm install @lvlte/ulp
```

## Usage

### Import

```js
// ESM
import { ulp, ufp, nextFloat, prevFloat } from '@lvlte/ulp';
```
```js
// CJS
const { ulp, ufp, nextFloat, prevFloat } = require('@lvlte/ulp');
```

### ulp(x) (alias: eps(x))
```js
console.log(
  ulp(),                                 // 2.220446049250313e-16
  ulp() === ulp(1),                      // true
  ulp() === Number.EPSILON,              // true

  ulp(Number.MAX_SAFE_INTEGER),          // 1
  ulp(Number.MAX_SAFE_INTEGER + 1),      // 2

  ulp(0),                                // 5e-324
  ulp(0) === Number.MIN_VALUE,           // true

  ulp(Infinity),                         // NaN
);
```

### ufp(x)
```js
console.log(
  ufp(Number.MAX_SAFE_INTEGER),          // 4503599627370496
  ufp(Number.MAX_SAFE_INTEGER + 1),      // 9007199254740992

  ufp(0),                                // 0
  ufp(1),                                // 1
  ufp(156074219035.20978),               // 137438953472

  ufp(Infinity),                         // NaN
);
```

### nextFloat(x) / prevFloat(x)
```js
console.log(
  nextFloat(0),                          // 5e-324
  nextFloat(0) === Number.MIN_VALUE,     // true

  nextFloat(1),                          // 1.0000000000000002
  nextFloat(1) === 1 + ulp(1),           // true

  nextFloat(Number.MAX_SAFE_INTEGER),    // 9007199254740992
  nextFloat(9007199254740992),           // 9007199254740994
  nextFloat(Number.MAX_VALUE),           // Infinity

  prevFloat(0),                          // -5e-324
  prevFloat(1),                          // 0.9999999999999999
  prevFloat(Infinity),                   // 1.7976931348623157e+308

  nextFloat(-1) === -prevFloat(1)        // true
  prevFloat(-1) === -nextFloat(1)        // true
);
```

## Use case

- Use the proper tolerance to check whether two floating-point numbers should be considered equal, or to approximate a given number as a rational number, etc.
- Floating-point number analysis and manipulation.
- Error bound computation and error mitigation.
