
export function lesson1_2() {
  // Section 5. Functional Programming with Iterables
  // 5.2 forEach Function (while)

  function forEach(f, iterable) {
    const iterator = iterable[Symbol.iterator]();
    while (true) {
      const { done, value } = iterator.next();
      if (done) break;
      f(value);
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
