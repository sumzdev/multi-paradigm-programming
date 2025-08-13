import { fromAsync, naturals } from '../../../lib/fx2';

function delay<T>(time: number, value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(resolve, time, value));
}

async function code_4_21() {
  async function* stringsAsyncTest(): AsyncIterableIterator<string> {
    yield delay(1000, 'a');

    const b = await delay(500, 'b') + 'c';

    yield b;
  }

  async function test() {
    const asyncIterator: AsyncIterableIterator<string> = stringsAsyncTest();
    const result1 = await asyncIterator.next();
    console.log(result1.value);

    const result2 = await asyncIterator.next();
    console.log(result2.value);

    const { done } = await asyncIterator.next();
    console.log(done);
  }

  await test();
}


async function code_4_22() {
  function toAsync<T>(iterable: Iterable<T | Promise<T>>): AsyncIterable<Awaited<T>> {
    return {
      [Symbol.asyncIterator](): AsyncIterator<Awaited<T>> {
        const iterator = iterable[Symbol.iterator]();
        return {
          async next() {
            const { done, value } = iterator.next();
            return done ? { done, value } : { done, value: await value };
          }
        };
      }
    };
  }

  async function test() {
    const asyncIterable = toAsync([1]);
    const asyncIterator = asyncIterable[Symbol.asyncIterator]();
    await asyncIterator.next().then(({ value }) => console.log(value));

    const asyncIterable2 = toAsync([Promise.resolve(2)]);
    const asyncIterator2 = asyncIterable2[Symbol.asyncIterator]();
    await asyncIterator2.next().then(({ value }) => console.log(value));
  }

  await test();
}

async function* toAsync<T>(
  iterable: Iterable<T | Promise<T>>
): AsyncIterableIterator<Awaited<T>> {
  for await (const value of iterable) {
    yield value;
  }
}

async function code_4_23() {
  async function test() {
    const asyncIterable = toAsync([1]);
    const asyncIterator = asyncIterable[Symbol.asyncIterator]();
    await asyncIterator.next().then(({ value }) => console.log(value));

    const asyncIterable2 = toAsync([Promise.resolve(2)]);
    const asyncIterator2 = asyncIterable2[Symbol.asyncIterator]();
    await asyncIterator2.next().then(({ value }) => console.log(value));
  }

  await test();
}

async function code_4_24() {
  async function test() {
    // (1)
    for await (const a of toAsync([1, 2])) {
      console.log(a);
    }

    // (2)
    for await (const a of toAsync([Promise.resolve(1), Promise.resolve(2)])) {
      console.log(a);
    }

    // (3)
    for await (const a of [1, 2]) {
      console.log(a);
    }

    // (4)
    for await (const a of [Promise.resolve(1), Promise.resolve(2)]) {
      console.log(a);
    }
  }

  await test();
}

async function code_4_25() {
  function mapSync<A, B>(
    f: (a: A) => B,
    iterable: Iterable<A>
  ): IterableIterator<B> {
    const iterator = iterable[Symbol.iterator]();
    return {
      next() {
        const { done, value } = iterator.next();
        return done
          ? { done, value }
          : { done, value: f(value) }; // [value: B], [const value: A]
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  }

  function mapAsync<A, B>(
    f: (a: A) => B,
    asyncIterable: AsyncIterable<A>
  ): AsyncIterableIterator<Awaited<B>> {
    const asyncIterator = asyncIterable[Symbol.asyncIterator]();
    return {
      async next() {
        const { done, value } = await asyncIterator.next();
        return done
          ? { done, value }
          : { done, value: await f(value) }; // [value: Awaited<B>] [value: A]
      },
      [Symbol.asyncIterator]() {
        return this;
      }
    };
  }

  async function* strings(): AsyncIterableIterator<string> {
    yield delay(500, 'a');
    yield delay(200, 'b');
  }

  const mapped = mapAsync(a => a.toUpperCase(), strings()); // [a: string]

  for await (const a of mapped) {
    console.log(a); // [const a: string]
  }
}

function* mapSync<A, B>(
  f: (a: A) => B,
  iterable: Iterable<A>
): IterableIterator<B> {
  for (const value of iterable) {
    yield f(value);
  }
}

// [4-26]
async function* mapAsync<A, B>(
  f: (a: A) => B,
  asyncIterable: AsyncIterable<A>
): AsyncIterableIterator<Awaited<B>> {
  for await (const value of asyncIterable) {
    yield f(value);
  }
}

async function code_4_27() {
  async function* numbers(): AsyncIterableIterator<number> {
    yield 1;
    yield 2;
  }

  for await (const a of mapAsync(a => a * 2, numbers())) {
    console.log(a);
  }

  for await (const a of mapAsync(a => a * 2, toAsync([1, 2]))) {
    console.log(a);
  }

  for await (const a of mapAsync(a => delay(100, a * 2), toAsync([1, 2]))) {
    console.log(a);
  }
}

// [4-28]
function* filterSync<A>(
  f: (a: A) => boolean,
  iterable: Iterable<A>
): IterableIterator<A> {
  for (const value of iterable) {
    if (f(value)) {
      yield value;
    }
  }
}

async function* filterAsync<A>(
  f: (a: A) => boolean | Promise<boolean>,
  asyncIterable: AsyncIterable<A>
): AsyncIterableIterator<A> {
  for await (const value of asyncIterable) {
    if (await f(value)) {
      yield value;
    }
  }
}

async function code_4_28() {
  for await (const a of filterAsync(a => a % 2 === 1, toAsync([1, 2, 3]))) {
    console.log(a);
  }

  for await (const a of filterAsync(a => delay(100, a % 2 === 1), toAsync([1, 2, 3]))) {
    console.log(a);
  }
}

function isIterable<T = unknown>(a: Iterable<T> | unknown): a is Iterable<T> {
  return typeof a?.[Symbol.iterator] === "function";
}

// [4-29]
function map<A, B>(
  f: (a: A) => B,
  iterable: Iterable<A>
): IterableIterator<B>;
function map<A, B>(
  f: (a: A) => B,
  asyncIterable: AsyncIterable<A>
): AsyncIterableIterator<Awaited<B>>;
function map<A, B>(
  f: (a: A) => B,
  iterable: Iterable<A> | AsyncIterable<A>
): IterableIterator<B> | AsyncIterableIterator<Awaited<B>> {
  return isIterable(iterable)
    ? mapSync(f, iterable)    // [iterable: Iterable<A>]
    : mapAsync(f, iterable);  // [iterable: AsyncIterable<A>]
}

async function code_4_30() {
  const iter1: IterableIterator<string> = map(
    (a: number) => a.toFixed(),
    [1, 2]
  );

  const iter2: IterableIterator<Promise<string>> = map(
    (a: number) => Promise.resolve(a.toFixed()),
    [1, 2]
  );

  const iter3: AsyncIterableIterator<string> = map(
    (a: number) => a.toFixed(),
    toAsync([1, 2])
  );

  const iter4: AsyncIterableIterator<string> = map(
    (a: number) => Promise.resolve(a.toFixed()),
    toAsync([1, 2])
  );

  const iter5: AsyncIterableIterator<string> = map(
    (a: number) => a.toFixed(),
    toAsync([Promise.resolve(1), Promise.resolve(2)])
  );

  const iter6: AsyncIterableIterator<string> = map(
    (a: number) => Promise.resolve(a.toFixed()),
    toAsync([Promise.resolve(1), Promise.resolve(2)])
  );
}

async function code_4_31() {
  async function test() {
    // (1)
    console.log([...map(a => a * 10, [1, 2])]);
    // [10, 20]

    // (2)
    for await (const a of map(a => delay(100, a * 10), toAsync([1, 2]))) {
      console.log(a);
    }

    // (3)
    console.log(
      await fromAsync(map(a => delay(100, a * 10), toAsync([1, 2])))
    );

    // (4)
    console.log(
      await Promise.all(map(a => delay(100, a * 10), [1, 2]))
    );
  }

  await test();
}

// [4-32]
function filter<A>(
  f: (a: A) => boolean,
  iterable: Iterable<A>
): IterableIterator<A>;
function filter<A>(
  f: (a: A) => boolean | Promise<boolean>,
  asyncIterable: AsyncIterable<A>
): AsyncIterableIterator<A>;
function filter<A>(
  f: (a: A) => boolean | Promise<boolean>,
  iterable: Iterable<A> | AsyncIterable<A>
): IterableIterator<A> | AsyncIterableIterator<A> {
  return isIterable(iterable)
    ? filterSync(f as (a: A) => boolean, iterable)
    : filterAsync(f, iterable);
}

async function code_4_33() {
  // (1)
  const iter1: IterableIterator<number> = filter(
    (a: number) => a % 2 === 1,
    [1, 2]
  );

  // (2)
  // Error TS2769: No overload matches this call.
  // const iter2 = filter(
  //   (a: number) => Promise.resolve(a % 2 === 1), // Error
  //   [1, 2]
  // );

  // (3)
  const iter3: AsyncIterableIterator<number> = filter(
    (a: number) => a % 2 === 1,
    toAsync([1, 2])
  );

  // (4)
  const iter4: AsyncIterableIterator<number> = filter(
    (a: number) => Promise.resolve(a % 2 === 1),
    toAsync([1, 2])
  );
}

const isOdd = (a: number) => a % 2 === 1;

async function code_4_34() {
  async function test() {
    // (1)
    console.log([...
      map(a => a * 10,
        filter(isOdd,
          naturals(4)))
    ]);
    // [10, 30]

    // (2)
    const iter2: AsyncIterableIterator<string> =
      map(a => a.toFixed(2),
        filter(a => delay(100, isOdd(a)),
          toAsync(naturals(4))));

    for await (const a of iter2) {
      console.log(a);
    }
    console.log('end');

    // (3)
    console.log(
      await fromAsync(
        map(a => delay(100, a * 10),
          toAsync(
            filter(isOdd,
              naturals(4)))))
    );
  }

  await test();
}

// [4-35, 4-36]
function fx<A>(iterable: Iterable<A>): FxIterable<A>;
function fx<A>(asyncIterable: AsyncIterable<A>): FxAsyncIterable<A>;
function fx<A>(
  iterable: Iterable<A> | AsyncIterable<A>
): FxIterable<A> | FxAsyncIterable<A> {
  return isIterable(iterable)
    ? new FxIterable(iterable)
    : new FxAsyncIterable(iterable);
}

class FxIterable<A> implements Iterable<A> {
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

  reduce<Acc>(f: (acc: Acc, a: A) => Acc, acc: Acc) {
    return reduce(f, acc, this);
  }

  toArray(): A[] {
    return [...this];
  }

  toAsync(): FxAsyncIterable<Awaited<A>> {
    return fx(toAsync(this));
  }
}

class FxAsyncIterable<A> implements AsyncIterable<A> {
  constructor(private asyncIterable: AsyncIterable<A>) {}

  [Symbol.asyncIterator]() {
    return this.asyncIterable[Symbol.asyncIterator]();
  }

  map<B>(f: (a: A) => B): FxAsyncIterable<Awaited<B>> {
    return fx(map(f, this));
  }

  filter(f: (a: A) => boolean | Promise<boolean>): FxAsyncIterable<A> {
    return fx(filter(f, this));
  }

  reduce<Acc>(f: (acc: Acc, a: A) => Acc | Promise<Acc>, acc: Acc) {
    return reduce(f, acc, this);
  }

  toArray(): Promise<A[]> {
    return fromAsync(this);
  }
}

async function code_4_37() {
  async function test() {
    // (1)
    console.log(
      fx(naturals(4))
        .filter(isOdd)
        .map(a => a * 10)
        .toArray()
    );

    // (2)
    const iter2 = fx(naturals(4))
      .toAsync()
      .filter(a => delay(100, isOdd(a)))
      .map(a => a.toFixed(2));

    for await (const a of iter2) {
      console.log(a);
    }
    console.log('end');

    // (3)
    console.log(
      await fx(naturals(4))
        .filter(isOdd)
        .toAsync()
        .map(a => delay(100, a * 10))
        .toArray()
    );
  }

  await test();
}


// [4-39]
function reduce<A, Acc>(
  f: (acc: Acc, a: A) => Acc, acc: Acc, iterable: Iterable<A>
): Acc;
function reduce<A, Acc>(
  f: (acc: Acc, a: A) => Acc | Promise<Acc>, acc: Acc, asyncIterable: AsyncIterable<A>
): Promise<Acc>;
function reduce<A, Acc>(
  f: any, acc: Acc, iterable: Iterable<A> | AsyncIterable<A>
): Acc | Promise<Acc> {
  return isIterable(iterable)
    ? reduceSync(f, acc, iterable)
    : reduceAsync(f, acc, iterable);
}

function reduceSync<A, Acc>(
  f: (acc: Acc, a: A) => Acc, acc: Acc, iterable: Iterable<A>
): Acc {
  for (const a of iterable) {
    acc = f(acc, a);
  }
  return acc;
}

async function reduceAsync<A, Acc>(
  f: (acc: Acc, a: A) => Acc | Promise<Acc>, acc: Acc, asyncIterable: AsyncIterable<A>
): Promise<Acc> {
  for await (const a of asyncIterable) {
    acc = await f(acc, a);
  }
  return acc;
}

async function code_4_38() {
  // async function test() {
  //   const iter2 = fx(naturals(4))
  //     .filter(a => delay(100, isOdd(a))) // Error (TS2322)
  //     .map(a => a.toFixed());
  //
  //   // TS2322: Type Promise<boolean> is not assignable to type boolean
  // }
  //
  // await test();
}

async function code_4_40() {
  const result: number =
    fx(naturals(4))
      .filter(isOdd)
      .map(a => a * 10)
      .reduce((acc, a) => acc + a, 0);

  const resultPromise: Promise<number> =
    fx(naturals(4))
      .filter(isOdd)
      .map(a => delay(100, a * 10))
      .toAsync()
      .reduce((acc, a) => acc + a, 0);

  console.log(
    result,
    await resultPromise
  );
}

export async function main() {
  await code_4_21();
  await code_4_22();
  await code_4_23();
  await code_4_24();
  await code_4_25();
  await code_4_27();
  await code_4_28();
  await code_4_30();
  await code_4_31();
  await code_4_33();
  await code_4_34();
  await code_4_37();
  await code_4_38();
  await code_4_40();
}
