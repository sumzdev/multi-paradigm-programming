export function* naturals(end = Infinity) {
  let n = 1;
  while (n <= end) {
    yield n++;
  }
}

export function* map<A, B>(f: (a: A) => B, iterable: Iterable<A>): IterableIterator<B> {
  for (const a of iterable) {
    yield f(a);
  }
}

export function forEach<A>(f: (a: A) => void, iterable: Iterable<A>): void {
  for (const a of iterable) {
    f(a);
  }
}

export function* filter<A>(f: (a: A) => boolean, iterable: Iterable<A>): IterableIterator<A> {
  for (const a of iterable) {
    if (f(a)) {
      yield a;
    }
  }
}

function baseReduce<A, Acc>(
  f: (acc: Acc, a: A) => Acc, acc: Acc, iterator: Iterator<A>
): Acc {
  while (true) {
    const { done, value } = iterator.next();
    if (done) break;
    acc = f(acc, value);
  }
  return acc;
}

function reduce<A, Acc>(
  f: (acc: Acc, a: A) => Acc, acc: Acc, iterable: Iterable<A>
): Acc;
function reduce<A, Acc>(
  f: (a: A, b: A) => Acc, iterable: Iterable<A>
): Acc;
function reduce<A, Acc>(
  f: (a: Acc | A, b: A) => Acc,
  accOrIterable: Acc | Iterable<A>,
  iterable?: Iterable<A>
): Acc {
  if (iterable === undefined) {
    const iterator = (accOrIterable as Iterable<A>)[Symbol.iterator]();
    const { done, value: acc } = iterator.next();
    if (done) throw new TypeError("'reduce' of empty iterable with no initial value");
    return baseReduce(f, acc, iterator) as Acc;
  } else {
    return baseReduce(f, accOrIterable as Acc, iterable[Symbol.iterator]());
  }
}

export { reduce };

export function* take<A>(limit: number, iterable: Iterable<A>): IterableIterator<A> {
  const iterator = iterable[Symbol.iterator]();
  while (true) {
    const { value, done } = iterator.next();
    if (done) break;
    yield value;
    if (--limit === 0) break;
  }
}

export const head = <A>(
  iterable: Iterable<A>
): A | undefined => iterable[Symbol.iterator]().next().value;

function* chunk<T>(size: number, iterable: Iterable<T>): IterableIterator<T[]> {
  const iterator = iterable[Symbol.iterator]();
  while (true) {
    const arr = [
      ...take(size, {
        [Symbol.iterator]() {
          return iterator;
        },
      }),
    ];
    if (arr.length) yield arr;
    if (arr.length < size) break;
  }
}

export async function fromAsync<T>(
  iterable: Iterable<Promise<T>> | AsyncIterable<T>
): Promise<T[]> {
  const arr: T[] = [];
  for await (const a of iterable) {
    arr.push(a);
  }
  return arr;
}

export function fx<A>(iterable: Iterable<A>): FxIterable<A> {
  return new FxIterable(iterable);
}

export class FxIterable<A> {
  constructor(private iterable: Iterable<A>) {}

  [Symbol.iterator]() {
    return this.iterable[Symbol.iterator]();
  }

  map<B>(f: (a: A) => B): FxIterable<B> {
    return fx(map(f, this));
  }

  filter(f: (a: A) => boolean): FxIterable<A> {
    return fx(filter(f, this));
  }

  reject(f: (a: A) => boolean): FxIterable<A> {
    return this.filter(a => !f(a));
  }

  take(limit: number): FxIterable<A> {
    return fx(take(limit, this));
  }

  forEach(f: (a: A) => void): void {
    return forEach(f, this);
  }

  chunk(size: number) {
    return fx(chunk(size, this));
  }

  reduce<Acc>(f: (acc: Acc, a: A) => Acc, acc: Acc): Acc;
  reduce<Acc>(f: (a: A, b: A) => Acc): Acc;
  reduce<Acc>(f: (a: Acc | A, b: A) => Acc, acc?: Acc): Acc {
    return acc === undefined
      ? reduce(f, this)
      : reduce(f, acc, this);
  }

  toArray(): A[] {
    return [...this];
  }

  to<R>(converter: (iterable: Iterable<A>) => R): R {
    return converter(this);
  }

  chain<B>(f: (iterable: this) => Iterable<B>): FxIterable<B> {
    return fx(f(this));
  }
}
