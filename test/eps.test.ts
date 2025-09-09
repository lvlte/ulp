import { eps } from '../src/index';

test('eps() === eps(1) === Number.EPSILON', () => {
  expect(eps()).toBe(eps(1));
  expect(eps(1)).toBe(Number.EPSILON);
});
