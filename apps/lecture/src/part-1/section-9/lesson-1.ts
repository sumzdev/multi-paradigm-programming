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

  take(limit: number) {
    return fx(take(limit, this));
  }
}

function* take<A>(limit: number, iterable: Iterable<A>): IterableIterator<A> {
  for (const a of iterable) {
    yield a;
    if (--limit === 0) break;
  }
}

export function lesson1() {
  // Section 9. List Processing – Code as Data, Logic in a List
  // 9.1 (for, i++, if, break) – Thinking of Code as a List

  const sumOfSquaresOfOddNumbers = (limit: number, list: number[]) =>
    fx(list)
      .filter(a => a % 2 === 1)
      .map(a => a * a)
      .take(limit)
      .reduce((a, b) => a + b, 0);

// function sumOfSquaresOfOddNumbers(limit: number, list: number[]): number {
//   let acc = 0;
//   for (const a of list) {
//     if (a % 2 === 1) {
//       const b = a * a;
//       acc += b;
//       if (--limit === 0) break;
//     }
//   }
//   return acc;
// }

  console.log(
    sumOfSquaresOfOddNumbers(3, [1, 2, 3, 4, 5, 6, 7, 8, 9])
  );
  // 35
}






