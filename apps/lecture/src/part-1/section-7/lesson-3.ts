import {red} from "@rune-ts/server/dist/lib/logHelper/picocolors";

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

function baseReduce<A, Acc>(
  f: (acc: Acc, a: A) => Acc,
  acc: Acc,
  iterator: Iterator<A>
): Acc {
  while (true) {
    const { done, value: a } = iterator.next();
    if (done) break;
    acc = f(acc, a);
  }
  return acc;
}

function reduce<A, Acc>(
  f: (a: A, b: A) => Acc,
  iterable: Iterable<A>
): Acc;
function reduce<A, Acc>(
  f: (acc: Acc, a: A) => Acc,
  acc: Acc,
  iterable: Iterable<A>
): Acc;
function reduce<A, Acc>(
  f: (acc: A | Acc, a: A) => Acc,
  accOrIterable: Acc | Iterable<A>,
  iterable?: Iterable<A>
): Acc {
  if (iterable === undefined) {
    iterable = accOrIterable as Iterable<A>;
    const iterator = iterable[Symbol.iterator]();
    const { done, value: acc } = iterator.next();
    if (done) throw new TypeError("'reduce' of empty iterable with no initial value");
    return baseReduce(f, acc, iterator) as Acc;
  } else {
    return baseReduce(f, accOrIterable as Acc, iterable[Symbol.iterator]());
  }
}

export function lesson3() {
  // 7.3 Method Overloading

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

    reduce<Acc>(f: (a: A, b: A) => Acc): Acc;
    reduce<Acc>(f: (acc: Acc, a: A) => Acc, acc: Acc): Acc;
    reduce<Acc>(f: (acc: A | Acc, a: A) => Acc, acc?: Acc): Acc {
      return acc === undefined
        ? reduce(f, this.iterable)
        : reduce(f, acc, this.iterable);
    }
  }

  function fx<A>(iterable: Iterable<A>) {
    return new FxIterable(iterable);
  }

  const num = fx(naturals(5))
    .filter(n => n % 2 === 1)
    .map(n => n * 10)
    .reduce((a, b) => a + b);

  console.log(num);
  // 90

  const num2 = fx(naturals(5))
    .filter(n => n % 2 === 1)
    .map(n => n * 10)
    .reduce((a, b) => a + b, 10);

  console.log(num2);
  // 100
}






















