function code_3_32_33() {
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

  const iterable = fx([1, 2, 3, 4, 5])
    .filter(a => a % 2 === 1)
    .map(a => a * a)
    .take(2);

  for (const a of iterable) {
    console.log('result:', a);
  }
  // take limit: 2
  // map
  // filter
  // result: 1
  // take limit: 1
  // map
  // filter
  // filter
  // result: 9
}

function code_3_34() {
  function* filter<A>(f: (a: A) => boolean, iterable: Iterable<A>): IterableIterator<A> {
    const iterator = iterable[Symbol.iterator]();
    while (true) {
      console.log('filter'); // (5)
      const { value, done } = iterator.next(); // (5)
      if (done) break;
      console.log('filter value f(value):', value, f(value)); // (6)
      if (f(value)) yield value; // (9)
    }
  }

  function* map<A, B>(f: (a: A) => B, iterable: Iterable<A>): IterableIterator<B> {
    const iterator = iterable[Symbol.iterator]();
    while (true) {
      console.log('map'); // (4)
      const { value, done } = iterator.next(); // (4)
      if (done) break;
      console.log('map value f(value):', value, f(value)); // (7)
      yield f(value);
    }
  }

  function* take<A>(limit: number, iterable: Iterable<A>): IterableIterator<A> {
    const iterator = iterable[Symbol.iterator]();
    while (true) {
      console.log('take limit:', limit); // (2)
      const { value, done } = iterator.next(); // (3)
      if (done) break;
      console.log('take value:', value);
      yield value;
      if (--limit === 0) break;
    }
  }

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

  const iterable = fx([1, 2, 3, 4, 5])
    .filter(a => a % 2 === 1)
    .map(a => a * a)
    .take(2);

  for (const a of iterable) {
    console.log('result:', a);
    console.log('---');
  }
  // take limit: 2
  // map
  // filter
  // filter value f(value): 1 true
  // map value f(value): 1 1
  // take value: 1
  // result: 1
  // ---
  // take limit: 1
  // map
  // filter
  // filter value f(value): 2 false
  // filter
  // filter value f(value): 3 true
  // map value f(value): 3 9
  // take value: 9
  // result: 9
  // ---
}

function code_3_35() {
  function map(f, iterable) {
    const iterator = iterable[Symbol.iterator]();
    return {
      next() {
        console.log('map'); // (3)
        const { done, value } = iterator.next(); // (4)
        console.log('map value f(value):', value, f(value)); // (5)
        return done
          ? { done, value }
          : { done, value: f(value) }; // (6)
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  }

  function take(limit, iterable) {
    const iterator = iterable[Symbol.iterator]();
    return {
      next() {
        if (limit === 0) return { done: true }; // (3-1)
        console.log('take limit:', limit); // (1)
        const { done, value } = iterator.next(); // (2)
        if (done) return { done, value };
        limit--;
        console.log('take value:', value); // (7)
        return { done, value };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  }

  const mapped = map(a => a * a, [10, 20, 30]);
  const taked = take(2, mapped);

  console.log(taked.next());
  // take limit: 2
  // map
  // map value f(value): 10 100
  // take value: 100
  // { done: false, value: 100 }

  console.log(taked.next());
  // take limit: 1
  // map
  // map value f(value): 20 400
  // take value: 400
  // { done: false, value: 400 }

  console.log(taked.next());
  // { done: true }
}

export function main() {
  code_3_32_33();
  console.log('--------------------');
  code_3_34();
  code_3_35();
}
