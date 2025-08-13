function fx<A>(iterable: Iterable<A>): FxIterable<A> {
  return new FxIterable(iterable);
}

class FxIterable<A> {
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

  take(limit: number): FxIterable<A> {
    return fx(take(limit, this));
  }
}

function* filter<A>(f: (a: A) => boolean, iterable: Iterable<A>): IterableIterator<A> {
  const iterator = iterable[Symbol.iterator]();
  while (true) {
    console.log('filter');
    const { value, done } = iterator.next();
    if (done) break;
    if (f(value)) yield value;
  }
}

function* map<A, B>(f: (a: A) => B, iterable: Iterable<A>): IterableIterator<B> {
  const iterator = iterable[Symbol.iterator]();
  while (true) {
    console.log('map');
    const { value, done } = iterator.next();
    if (done) break;
    yield f(value);
  }
}

function* take<A>(limit: number, iterable: Iterable<A>): IterableIterator<A> {
  const iterator = iterable[Symbol.iterator]();
  while (true) {
    console.log('take limit:', limit);
    const { value, done } = iterator.next();
    if (done) break;
    yield value;
    if (--limit === 0) break;
  }
}

export function lesson4() {
  // 9.4 Execution Order in Lazy Evaluation

  const iterable = fx([1, 2, 3, 4, 5])
    .filter(a => a % 2 === 1)
    .map(a => a * a)
    .take(2);

  for (const a of iterable) {
    console.log('result:', a);
  }

  /*
  (1)
  filter
  filter
  filter
  map
  map
  take limit: 2
  take limit: 1
  result: 1
  result: 9

  (2)
  filter
  map
  take limit: 2
  result: 1
  filter
  filter
  map
  take limit: 1
  result: 9
  * */
}
