import { fx, take } from '../../../lib/fx2';

function delay<T>(time: number, value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(resolve, time, value));
}

async function code_4_13() {
  type File = {
    name: string;
    body: string;
    size: number;
  };

  function getFile(name: string, size = 1000): Promise<File> {
    return delay(size, { name, body: '...', size });
  }

  async function test() {
    const files: File[] = await Promise.all([
      getFile('img.png'),
      getFile('book.pdf'),
      getFile('index.html'),
      getFile('img.png'),
      getFile('book.pdf'),
      getFile('index.html'),
    ]);

    console.log(files);
  }

  await test();
}

async function code_4_14() {
  type File = {
    name: string;
    body: string;
    size: number;
  };

  function getFile(name: string, size = 1000): Promise<File> {
    return delay(size, { name, body: '...', size });
  }

  async function executeWithLimit<T>(
    promises: Promise<T>[],
    limit: number
  ): Promise<T[]> {
    const result1 = await Promise.all([promises[0], promises[1], promises[2]]);
    const result2 = await Promise.all([promises[3], promises[4], promises[5]]);
    return [
      ...result1,
      ...result2
    ];
  }

  async function test() {
    const files: File[] = await executeWithLimit([
      getFile('img.png'),
      getFile('book.pdf'),
      getFile('index.html'),
      getFile('img.png'),
      getFile('book.pdf'),
      getFile('index.html'),
    ], 3);

    console.log(files);
  }

  await test();
}

type File = {
  name: string;
  body: string;
  size: number;
};

function getFile(name: string, size = 1000): Promise<File> {
  console.log(`${name} start`);
  return delay(size, { name, body: '...', size });
}

async function code_4_14a() {
  async function executeWithLimit<T>(
    promises: Promise<T>[],
    limit: number
  ): Promise<T[]> {
    const result1 = await Promise.all([promises[0], promises[1], promises[2]]);
    const result2 = await Promise.all([promises[3], promises[4], promises[5]]);
    return [
      ...result1,
      ...result2
    ];
  }

  async function test() {
    const promises = [
      getFile('1-img.png'),
      getFile('2-book.pdf'),
      getFile('3-index.html'),
      getFile('4-img2.png'),
      getFile('5-book.pdf'),
      getFile('6-index.html'),
    ];

    const files: File[] = await executeWithLimit(promises, 3);

    console.log(files);
  }

  await test();
}

async function code_4_15() {
  async function executeWithLimit<T>(
    fs: (() => Promise<T>)[],
    limit: number
  ): Promise<T[]> {
    const result1 = await Promise.all([fs[0](), fs[1](), fs[2]()]);
    const result2 = await Promise.all([fs[3](), fs[4](), fs[5]()]);
    return [
      ...result1,
      ...result2
    ];
  }

  async function test() {
    const files: File[] = await executeWithLimit([
      () => getFile('1-img.png'),
      () => getFile('2-book.pdf'),
      () => getFile('3-index.html'),
      () => getFile('4-img2.png'),
      () => getFile('5-book.pdf'),
      () => getFile('6-index.html'),
    ], 3);

    console.log(files);
  }

  await test();
}

async function code_4_16() {

  async function executeWithLimit<T>(
    fs: (() => Promise<T>)[],
    limit: number
  ): Promise<T[]> {
    const results: T[] = [];

    for (let i = 0; i < fs.length; i += limit) {
      const batchPromises: Promise<T>[] = [];

      for (let j = 0; j < limit && (i + j) < fs.length; j++) {
        batchPromises.push(fs[i + j]());
      }

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
    }

    return results;
  }

  async function test() {
    const files: File[] = await executeWithLimit([
      () => getFile('1-img.png'),
      () => getFile('2-book.pdf'),
      () => getFile('3-index.html'),
      () => getFile('4-img2.png'),
      () => getFile('5-book.pdf'),
      () => getFile('6-index.html'),
      () => getFile('7-img.png'),
    ], 3);

    console.log(files);
  }

  await test();
}

async function code_4_17() {
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

  // class FxIterable<A> {
  //   ...
  //   chunk(size: number) {
  //     return fx(chunk(size, this));
  //   }
  // }

  console.log([...chunk(2, [1, 2, 3, 4, 5])]);
  // [[1, 2], [3, 4], [5]]

  fx([1, 2, 3, 4, 5])
    .chunk(2)
    .map(arr => arr.map(a => a * 10)) // [arr: number[]], [a: number]
    .forEach(arr => console.log(arr));
  // [10, 20]
  // [30, 40]
  // [50]
}

async function fromAsync<T>(
  iterable: Iterable<Promise<T>> | AsyncIterable<T>
): Promise<T[]> {
  const arr: T[] = [];
  for await (const a of iterable) {
    arr.push(a);
  }
  return arr;
}

async function code_4_18() {
  const executeWithLimit = <T>(fs: (() => Promise<T>)[], limit: number): Promise<T[]> =>
    fx(fs)
      .chunk(limit)
      .map(fs => fs.map(f => f()))
      .map(ps => Promise.all(ps))
      .to(fromAsync)
      .then(arr => arr.flat());

  async function test() {
    const files: File[] = await executeWithLimit([
      () => getFile('1-img.png'),
      () => getFile('2-book.pdf'),
      () => getFile('3-index.html'),
      () => getFile('4-img2.png'),
      () => getFile('5-book.pdf'),
      () => getFile('6-index.html'),
      () => getFile('7-img.png'),
    ], 3);

    console.log(files);
  }

  await test();
}

async function code_4_19() {
  const executeWithLimit = <T>(fs: (() => Promise<T>)[], limit: number): Promise<T[]> =>
    fx(fs)
      .map(f => f())
      .chunk(limit)
      .map(ps => Promise.all(ps))
      .to(fromAsync)
      .then(arr => arr.flat());

  async function test() {
    const files: File[] = await executeWithLimit([
      () => getFile('1-img.png'),
      () => getFile('2-book.pdf'),
      () => getFile('3-index.html'),
      () => getFile('4-img2.png'),
      () => getFile('5-book.pdf'),
      () => getFile('6-index.html'),
      () => getFile('7-img.png'),
    ], 3);

    console.log(files);
  }

  await test();
}

export async function main() {
  await code_4_13();
  await code_4_14();
  await code_4_14a();
  await code_4_15();
  await code_4_16();
  await code_4_17();
  await code_4_18();
  await code_4_19();
}
