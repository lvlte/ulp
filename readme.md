# ulp (epsilon function)

> Compute the [unit of least precision](https://en.wikipedia.org/wiki/Unit_in_the_last_place)
of a given IEEE-754 64-bit number : `eps(x)` (alias `ulp(x)`).<br>
> Get the closest representable number that comes before/after it on the float64
number line : `nextFloat(x)`, `prevFloat(x)`.


## Install

```sh
npm install @lvlte/ulp
```

## Usage

```js
// ESM
import { eps, nextFloat, prevFloat } from '@lvlte/ulp';
```
```js
// CJS
const { eps, nextFloat, prevFloat } = require('@lvlte/ulp');
```
```js
console.log( eps() );                               // 2.220446049250313e-16
console.log( eps() === eps(1) );                    // true
console.log( eps() === Number.EPSILON );            // true

console.log( eps(Number.MAX_SAFE_INTEGER) );        // 1
console.log( eps(Number.MAX_SAFE_INTEGER + 1) );    // 2

console.log( eps(0) );                              // 5e-324
console.log( eps(0) === Number.MIN_VALUE );         // true

console.log( eps(Infinity) );                       // NaN
```
```js
console.log( nextFloat(0) );                        // 5e-324
console.log( nextFloat(0) === Number.MIN_VALUE );   // true

console.log( nextFloat(1) );                        // 1.0000000000000002
console.log( nextFloat(1) === 1 + eps(1) );         // true

console.log( nextFloat(Number.MAX_SAFE_INTEGER) );  // 9007199254740992
console.log( nextFloat(9007199254740992) );         // 9007199254740994
console.log( nextFloat(Number.MAX_VALUE) );         // Infinity

console.log( prevFloat(0) );                        // -5e-324
console.log( prevFloat(1) );                        // 0.9999999999999999
console.log( prevFloat(9007199254740992) );         // 9007199254740991
console.log( prevFloat(Infinity) );                 // 1.7976931348623157e+308
```

## Use case

- Use the proper tolerance to check whether two floating-point numbers should be considered equal.
- Use the proper tolerance to approximate a floating-point number as a rational number.
