
export function lesson1_1() {
  // Section 5. Functional Programming with Iterables
  // 5.1 forEach Function (for)

  function forEach(f, iterable) {
    for (const a of iterable) {
      f(a);
    }
  }

  const array = [1, 2, 3];
  forEach(console.log, array);
  // 1
  // 2
  // 3

  const set = new Set([10, 30, 30]);
  forEach(console.log, set);
}
