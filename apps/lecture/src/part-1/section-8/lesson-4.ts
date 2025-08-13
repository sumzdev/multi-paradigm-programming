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

function fx<A>(iterable: Iterable<A>) {
  return new FxIterable(iterable);
}

class FxIterable<A> {
  constructor(private iterable: Iterable<A>) {}

  [Symbol.iterator]() {
    return this.iterable[Symbol.iterator]();
  }

  map<B>(f: (a: A) => B) {
    return fx(map(f, this));
  }

  filter(f: (a: A) => boolean) {
    return fx(filter(f, this));
  }

  forEach(f: (a: A) => void) {
    return forEach(f, this);
  }

  reduce<Acc>(f: (a: A, b: A) => Acc): Acc;
  reduce<Acc>(f: (acc: Acc, a: A) => Acc, acc: Acc): Acc;
  reduce<Acc>(f: (a: A | Acc, b: A) => Acc, acc?: Acc): Acc {
    return acc === undefined
      ? reduce(f, this)
      : reduce(f, acc, this);
  }

  toArray() {
    return [...this];
  }

  to<R>(converter: (iterable: this) => R) {
    return converter(this);
  }

  chain<B>(f: (iterable: this) => Iterable<B>) {
    return fx(f(this));
  }
}

export function lesson4() {
  // 8.4 Enhancing Class Extensibility Even Further — Extending at Runtime

  // # sorted 1
  const sorted = [...fx([5, 2, 3, 1, 4, 5, 3])
    .filter(n => n % 2 === 1)
    .map(n => n * 10)
  ]
    .sort((a, b) => a - b);

  console.log(sorted);
  // [10, 30, 30, 50, 50]

  // # sorted 2
  const iterable = fx([5, 2, 3, 1, 4, 5, 3])
    .filter(n => n % 2 === 1)
    .map(n => n * 10);

  const sorted2 = [...iterable].sort((a, b) => a - b);
  console.log(sorted2);
  // [10, 30, 30, 50, 50]

  // # sorted 3
  const sorted3 = fx([5, 2, 3, 1, 4, 5, 3])
    .filter(n => n % 2 === 1)
    .map(n => n * 10)
    .toArray()
    .sort((a, b) => a - b);

  console.log(sorted3);
  // [10, 30, 30, 50, 50]

  // # to
  const sorted4 = fx([5, 2, 3, 1, 4, 5, 3])
    .filter(n => n % 2 === 1)
    .map(n => n * 10)
    .to(([...arr]) => arr)
    .sort((a, b) => a - b);

  console.log(sorted4);
  // [10, 30, 30, 50, 50]

  const size = fx([5, 2, 3, 1, 4, 5, 3])
    .filter(n => n % 2 === 1)
    .map(n => n * 10)
    .to(iter => new Set(iter))
    .add(10)
    .add(20)
    .size;

  console.log(size);

  const set = fx([5, 2, 3, 1, 4, 5, 3])
    .filter(n => n % 2 === 1)
    .map(n => n * 10)
    .to(iter => new Set(iter))
    .difference(new Set([10, 20]));

  console.log(set);

  // # chain

  const result = fx([5, 2, 3, 1, 4, 5, 3])
    .filter(n => n % 2 === 1)
    .map(n => n * 10)
    .chain(iter => new Set(iter))
    .map(n => n - 10)
    .reduce((a, b) => `${a}, ${b}`);

  console.log(result);

}