export function lesson4() {
  // 5.4 Composing Higher-Order Functions ((()))

  function forEach(f, iterable) {
    for (const value of iterable) {
      f(value);
    }
  }

  function map(f, iterable): any {
    const iterator = iterable[Symbol.iterator]();
    return {
      next() {
        const { done, value } = iterator.next();
        return done
          ? { done, value }
          : { done, value: f(value) };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  }

  function* filter(f, iterable) {
    const iterator = iterable[Symbol.iterator]();
    while (true) {
      const { value, done } = iterator.next();
      if (done) break;
      if (f(value)) {
        yield value;
      }
    }
  }

  function* naturals(end = Infinity) {
    let n = 1;
    while (n <= end) {
      yield n++;
    }
  }

  forEach(console.log,
    map(x => x * 10,
      filter(x => x % 2 === 1,
        naturals(5))));
  // 10
  // 30
  // 50
}

