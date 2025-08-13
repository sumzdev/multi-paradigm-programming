export function lesson4_1() {
  // 4.4 Iterator, Generator, Iterable
  function naturals(end = Infinity): IterableIterator<number> {
    let n = 1;
    return {
      next() {
        return n <= end
          ? { value: n++, done: false } : { value: undefined, done: true };
      },
      [Symbol.iterator]() {
        return this;
      }
    }
  }

  function map<A, B>(f: (a: A) => B, iterable: Iterable<A>): IterableIterator<B> {
    const iterator = iterable[Symbol.iterator]();
    return {
      next() {
        const { done, value } = iterator.next();
        return done ? { done, value } : { done, value: f(value) };
      },
      [Symbol.iterator]() {
        return this;
      }
    }
  }

  const mapped = map((x) => x * 2, naturals(4));

  let acc = 0;
  for (const num of mapped) {
    acc += num;
  }
  console.log(acc); // 20

  console.log(
    [...map(a => a * 10, [1, 2, 3, 4])]
  ); // [10, 20, 30, 40]
}

