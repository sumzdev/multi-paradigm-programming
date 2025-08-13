export function lesson3_3() {
  // 5.3 filter Function (iterator)

  function filter(f, iterable): any {
    const iterator = iterable[Symbol.iterator]();
    return {
      next() {
        while (true) {
          const { done, value } = iterator.next();
          if (done) return { done, value };
          if (f(value)) return { done, value };
        }
      },
      [Symbol.iterator]() {
        return this;
      }
    }
  }

  const array = [1, 2, 3, 4, 5];
  const filtered = filter(x => x % 2 === 0, array);
  console.log([...filtered]); // [2, 4]
  // const iterator = filtered[Symbol.iterator]();
  // console.log(iterator.next());
  // console.log(iterator.next());
  // console.log(iterator.next());

  const filtered2 = filter(x => x % 2 === 1, array);
  console.log([...filtered2]); // [1, 3, 5]
}
