function* naturals(end = Infinity) {
  let n = 1;
  while (n <= end) {
    yield n++;
  }
}

function* map<A, B>(f: (a: A) => B, iterable: Iterable<A>): IterableIterator<B> {
  for (const a of iterable) {
    yield f(a);
  }
}

function* filter<A>(f: (a: A) => boolean, iterable: Iterable<A>): IterableIterator<A> {
  for (const a of iterable) {
    if (f(a)) {
      yield a;
    }
  }
}

function forEach<A>(f: (a: A) => void, iterable: Iterable<A>): void {
  for (const a of iterable) {
    f(a);
  }
}

export function lesson2() {
  // 7.2 Extending Iterables with Generic Classes

  class FxIterable<A> {
    constructor(private iterable: Iterable<A>) {}

    map<B>(f: (a: A) => B) {
      return fx(map(f, this.iterable));
    }

    filter(f: (a: A) => boolean) {
      return fx(filter(f, this.iterable));
    }

    forEach(f: (a: A) => void) {
      return forEach(f, this.iterable);
    }
  }

  function fx<A>(iterable: Iterable<A>): FxIterable<A> {
    return new FxIterable(iterable);
  }

  const mapped = new FxIterable(['1', '2'])
    .map(a => parseInt(a))
    .map(b => b + b)
    .map(c => c.toFixed(2));

  // ((()))
  // forEach(printNumber,
  //   map(n => n * 10,
  //     filter(n => n % 2 === 1,
  //       naturals(5))));

  // Pipe Operator
  // naturals(5)
  //   |> filter(n => n % 2 === 1, %)
  //   |> map(n => n * 10, %)
  //   |> forEach(printNumber, %)

  // Chaining
  fx(naturals(5))
    .filter(n => n % 2 === 1)
    .map(n => n * 10)
    .forEach(printNumber);

  function printNumber(n: number) {
    console.log(n);
  }
}






















