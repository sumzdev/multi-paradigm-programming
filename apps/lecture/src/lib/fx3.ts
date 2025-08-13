/*
import { filter, forEach, map, range, reduce, take } from '@fxts/core';

function isIterable<T = unknown>(a: Iterable<T> | unknown): a is Iterable<T> {
  return typeof a?.[Symbol.iterator] === "function";
}

function isIterator<T = unknown>(a: any): a is Iterator<T> {
  return a != null && typeof a.next === 'function';
}

function* genIterator<A>(seed: A, f: (seed: A) => A): IterableIterator<A> {
  while (true) {
    yield seed;
    seed = f(seed);
  }
}

function fx<A>(iterator: Iterator<A>): FxIterator<A>;
function fx<A>(seed: A, f: (seed: A) => A): FxIterable<number>;
function fx(start: number): FxIterable<number>;
function fx<A>(f: () => IterableIterator<A>): FxIterable<A>;
function fx<A>(iterable: Iterable<A>): FxIterable<A>;
function fx<A>(
  iterable: number | Iterable<A> | (() => IterableIterator<A>) | Iterator<A>,
  f?: (seed: A) => IterableIterator<A>,
): FxIterable<A> | FxIterable<number> | FxIterator<A> {
  if (isIterator(iterable)) {
    return new FxIterator(iterable);
  } else if (f !== undefined) {
    return fx(() => genIterator(iterable as A, f as (seed: A) => A));
  } if (typeof iterable === 'number') {
    return fx(() => range(iterable, Infinity));
  } else if (typeof iterable === 'function') {
    return new FxIterable({ [Symbol.iterator]: iterable });
  } else {
    return new FxIterable(iterable);
  }
}

abstract class FxBase<A> {
  constructor(protected iterable: Iterable<A>) {}

  [Symbol.iterator]() {
    return this.iterable[Symbol.iterator]();
  }

  map<B>(f: (a: A) => B) {
    return fx(() => map(f, this));
  }

  filter(f: (a: A) => boolean) {
    return fx(() => filter(f, this));
  }

  take(limit: number) {
    return fx(() => take(limit, this));
  }

  forEach(f: (a: A) => void): void {
    return forEach(f, this);
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
}

class FxIterable<A> extends FxBase<A> {}

class FxIterator<A> extends FxBase<A> {
  constructor(protected iterator: Iterator<A>) {
    super({
      [Symbol.iterator]() {
        return iterator;
      }
    });
  }

  next() {
    return this.iterator.next();
  }
}


// 1. Iterable Examples
const iterable = fx(1);
console.log(iterable.take(3).toArray()); // [1, 2, 3]
console.log([...iterable.take(3)]); // [1, 2, 3]

const iterable2 = iterable.map(a => a * 10);
console.log(iterable2.take(2).toArray()); // [10, 20]

const iterable3 = iterable2.map(a => a / 10);
console.log([...iterable3.take(3)]); // [1, 2, 3]

const iterable4 = iterable3.filter(a => a % 2 === 1);
console.log(iterable4.take(3).toArray()); // [1, 3, 5]

console.log(iterable4.take(2).reduce((a, b) => a + b));
// 4

iterable4.take(2).forEach(console.log);
// 1
// 3

const iterable5 = fx(10, n => n - 1).take(5);
console.log(iterable5.toArray()); // [10, 9, 8, 7, 6]
console.log(iterable5.take(3).toArray()); // [10, 9, 8]

console.log([...fx([1, 2, 3])]); // [1, 2, 3]

function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}

const iterable6 = fx(numbers);
console.log(iterable6.take(2).toArray()); // [1, 2]
console.log(iterable6.take(2).toArray()); // [1, 2]

// 2. Iterator Examples
const iterable7 = fx(numbers());
console.log(iterable7.take(2).toArray()); // [1, 2]
console.log(iterable7.take(2).toArray()); // [3]

console.log(iterable7 instanceof FxIterable, iterable7 instanceof FxIterator);
// false, true

export { fx };

*/
