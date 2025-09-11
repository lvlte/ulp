# number-epsilon

> Compute the [unit of least precision](https://en.wikipedia.org/wiki/Unit_in_the_last_place)
of a given IEEE-754 64-bit number.

## Install

```sh
npm install @lvlte/number-epsilon
```

## Usage

```js
// ESM
import { eps } from '@lvlte/number-epsilon';
```
```js
// CJS
const { eps } = require('@lvlte/number-epsilon');
```
```js
console.log(eps());                             // 2.220446049250313e-16
console.log(eps() === eps(1));                  // true
console.log(eps() === Number.EPSILON);          // true

console.log(eps(Number.MAX_SAFE_INTEGER));      // 1
console.log(eps(Number.MAX_SAFE_INTEGER + 1));  // 2

console.log(eps(0));                            // 5e-324
console.log(eps(0) === Number.MIN_VALUE);       // true

console.log(eps(Infinity));                     // NaN
```

## Use case

- Check whether two floating point numbers can be considered equal.
- Approximate a floating point number x as a rational number.
- Get the next/previous float on the float64 number line.
