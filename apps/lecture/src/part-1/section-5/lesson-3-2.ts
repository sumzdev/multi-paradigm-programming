export function lesson3_2() {
  // 5.3 filter Function (while)

  function* filter(f, iterable) {
    const iterator = iterable[Symbol.iterator]();
    while (true) {
      const { done, value } = iterator.next();
      if (done) break;
      if (f(value)) {
        yield value;
      }
    }
  }

  const array = [1, 2, 3, 4, 5];
  const filtered = filter(x => x % 2 === 0, array);
  console.log([...filtered]); // [2, 4]

  const filtered2 = filter(x => x % 2 === 1, array);
  console.log([...filtered2]); // [1, 3, 5]
}
