function code_1_35() {
  function forEach(f, iterable) {
    for (const value of iterable) {
      f(value);
    }
  }

  const array = [1, 2, 3];
  forEach(console.log, array);
  // 1
  // 2
  // 3
}

function code_1_36() {
  function forEach(f, iterable) {
    const iterator = iterable[Symbol.iterator]();
    let result = iterator.next();
    while (!result.done) {
      f(result.value);
      result = iterator.next();
    }
  }

  const set = new Set([4, 5, 6]);
  forEach(console.log, set);
  // 4
  // 5
  // 6
}

function code_1_37() {
  function* map(f, iterable) {
    for (const value of iterable) {
      yield f(value);
    }
  }

  const array = [1, 2, 3];
  const mapped = map((x) => x * 2, array);
  console.log([...mapped]); // [2, 4, 6]

  const mapped2 = map((x) => x * 3, naturals(3));
  forEach(console.log, mapped2);
  // 3
  // 6
  // 9
}

function code_1_38() {
  function* map(f, iterable) {
    const iterator = iterable[Symbol.iterator]();
    while (true) {
      // (1)
      const { value, done } = iterator.next(); // (2)
      if (done) break; // (3)
      yield f(value); // (4)
    }
  }

  const mapped = map(
    ([k, v]) => `${k}: ${v}`,
    new Map([['a', 1], ['b', 2]]),
  );
  forEach(console.log, mapped);
  // a: 1
  // b: 2
}

function code_1_39() {
  function map(f, iterable) {
    const iterator = iterable[Symbol.iterator]();
    return {
      // (1)
      next() {
        const { done, value } = iterator.next();
        return done
          ? { done, value }
          : { done, value: f(value) }; // (2)
      },
      [Symbol.iterator]() {
        // (3)
        return this;
      },
    };
  }

  const iterator = (function* () {
    // (4)
    yield 1;
    yield 2;
    yield 3;
  })();

  const mapped = map((x) => x * 10, iterator); // (5)

  console.log([...mapped]); // [10, 20, 30]
}

function code_1_40() {
  function* filter(f, iterable) {
    for (const value of iterable) {
      if (f(value)) {
        yield value;
      }
    }
  }

  const array = [1, 2, 3, 4, 5];
  const filtered = filter((x) => x % 2 === 0, array);
  console.log([...filtered]); // [2, 4]
}

function code_1_41() {
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

  const array = [1, 2, 3, 4, 5];
  const filtered = filter((x) => x % 2 === 0, array);
  console.log([...filtered]); // [2, 4]
}

function code_1_42() {
  function filter(f, iterable) {
    const iterator = iterable[Symbol.iterator]();
    return {
      next() {
        const { done, value } = iterator.next();
        if (done) return { done, value }; // (3)
        if (f(value)) return { done, value }; // (1)
        return this.next(); // (2)
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  }

  console.log(...filter((x) => x % 2 === 1, [1, 2, 3, 4, 5])); // 1 3 5
}

function code_1_42a() {
  function filter(f, iterable) {
    const iterator = iterable[Symbol.iterator]();
    return {
      next() {
        do {
          const { done, value } = iterator.next();
          if (done) return { done, value };
          if (f(value)) return { done, value };
        } while (true);
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  }

  // function filter(f, iterable) {
  //   const iterator = iterable[Symbol.iterator]();
  //   return {
  //     next() {
  //       while (true) {
  //         const { done, value } = iterator.next();
  //         if (done) return { done, value };
  //         if (f(value)) return { value };
  //       }
  //     },
  //     [Symbol.iterator]() {
  //       return this;
  //     },
  //   };
  // }

  console.log(...filter((x) => x % 2 === 1, [1, 2, 3, 4, 5])); // 1 3 5
}

function code_1_43() {
  forEach(console.log,
    map(x => x * 10,
      filter(x => x % 2 === 1,
        naturals(5))));
  // 10
  // 30
  // 50
}

function code_1_44() {
  function* filter(f, iterable) {
    for (const value of iterable) {
      yield* [value].filter(f);
    }
  }

  const array = [1, 2, 3, 4, 5];
  const filtered = filter(x => x % 2 === 0, array);
  console.log([...filtered]); // [2, 4]
}

export function main() {
  code_1_35();
  code_1_36();
  code_1_37();
  code_1_38();
  code_1_39();
  code_1_40();
  code_1_41();
  code_1_42();
  code_1_42a();
  code_1_43();
  code_1_44();
}

function naturals(end = Infinity): IterableIterator<number> {
  let n = 1;
  return {
    next(): IteratorResult<number> {
      return n <= end
        ? { value: n++, done: false }
        : { value: undefined, done: true };
    },
    [Symbol.iterator]() {
      return this;
    },
  };
}

function forEach(f, iterable) {
  const iterator = iterable[Symbol.iterator]();
  let result = iterator.next();
  while (!result.done) {
    f(result.value);
    result = iterator.next();
  }
}

function* map(f, iterable) {
  for (const value of iterable) {
    yield f(value);
  }
}

function* filter(f, iterable) {
  for (const value of iterable) {
    if (f(value)) {
      yield value;
    }
  }
}
