export function lesson3_1() {
  // 5.3 filter Function (for)

  function* filter(f, iterable) {
    for (const a of iterable) {
      if (f(a)) {
        yield a;
      }
    }
  }

  const array = [1, 2, 3, 4, 5];
  const filtered = filter(x => x % 2 === 0, array);
  console.log([...filtered]); // [2, 4]

  const filtered2 = filter(x => x % 2 === 1, array);
  console.log([...filtered2]); // [1, 3, 5]
}
