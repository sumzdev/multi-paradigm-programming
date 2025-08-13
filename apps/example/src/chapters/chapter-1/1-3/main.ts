function code_1_15_16() {
  function naturals(end = Infinity): Iterator<number> {
    let n = 1;
    return {
      next(): IteratorResult<number> {
        return n <= end
          ? { value: n++, done: false }
          : { value: undefined, done: true };
      },
    };
  }

  const iterator = naturals(3);

  console.log(iterator.next().value); // 1
  console.log(iterator.next().value); // 2
  console.log(iterator.next().value); // 3
  console.log(iterator.next().done); // true

  /*
  const iterator2 = naturals(3);

  // TS2488: Type Iterator<number, any, undefined>
  // must have a [Symbol.iterator]() method that returns an iterator.
  for (const num of iterator2) {
    console.log(num);
  }
  */
}

// [1-17]
function naturals(end = Infinity): IterableIterator<number> {
  let n = 1;
  return {
    next(): IteratorResult<number> {
      return n <= end
        ? { value: n++, done: false }
        : { value: undefined, done: true };
    },
    [Symbol.iterator]() {
      return this;
    },
  };
}

function code_1_17() {
  const iterator = naturals(3);

  for (const num of iterator) {
    console.log(num);
  }
  // 1
  // 2
  // 3
}

function code_1_19() {
  const array = [1, 2, 3];
  const arrayIterator = array[Symbol.iterator]();

  console.log(arrayIterator.next()); // { value: 1, done: false }
  console.log(arrayIterator.next()); // { value: 2, done: false }
  console.log(arrayIterator.next()); // { value: 3, done: false }
  console.log(arrayIterator.next()); // { value: undefined, done: true }

  for (const value of array) {
    console.log(value);
  }
  // 1
  // 2
  // 3
}

function code_1_20() {
  const set = new Set([1, 2, 3]);
  const setIterator = set[Symbol.iterator]();

  console.log(setIterator.next()); // { value: 1, done: false }
  console.log(setIterator.next()); // { value: 2, done: false }
  console.log(setIterator.next()); // { value: 3, done: false }
  console.log(setIterator.next()); // { value: undefined, done: true }

  for (const value of set) {
    console.log(value);
  }
  // 1
  // 2
  // 3
}

function code_1_21_22_23_24() {
  const map = new Map([
    ['a', 1],
    ['b', 2],
    ['c', 3],
  ]);
  const mapIterator = map[Symbol.iterator]();

  console.log(mapIterator.next()); // { value: ['a', 1], done: false }
  console.log(mapIterator.next()); // { value: ['b', 2], done: false }
  console.log(mapIterator.next()); // { value: ['c', 3], done: false }
  console.log(mapIterator.next()); // { value: undefined, done: true }

  for (const [key, value] of map) {
    console.log(`${key}: ${value}`);
  }
  // a: 1
  // b: 2
  // c: 3

  const mapEntries = map.entries();

  console.log(mapEntries.next()); // { value: ['a', 1], done: false }
  console.log(mapEntries.next()); // { value: ['b', 2], done: false }
  console.log(mapEntries.next()); // { value: ['c', 3], done: false }
  console.log(mapEntries.next()); // { value: undefined, done: true }

  for (const entry of map.entries()) {
    console.log(entry);
  }
  // ['a', 1]
  // ['b', 2]
  // ['c', 3]

  const mapValues = map.values();

  console.log(mapValues.next()); // { value: 1, done: false }

  for (const value of mapValues) {
    console.log(value);
  }
  // 2
  // 3

  const mapKeys = map.keys();

  console.log(mapKeys.next()); // { value: 'a', done: false }

  for (const key of mapKeys) {
    console.log(key);
  }
  // b
  // c
}

function code_1_25() {
  const array = [1, 2, 3];
  const array2 = [...array, 4, 5, 6];

  console.log(array2); // [1, 2, 3, 4, 5, 6]
}

function code_1_26() {
  const set = new Set([1, 2, 3]);
  const array = [...set];

  console.log(array); // [1, 2, 3]
}

function code_1_27() {
  const numbers = [1, 2, 3];

  function sum(...nums: number[]): number {
    return nums.reduce((a, b) => a + b, 0);
  }

  console.log(sum(...numbers)); // 6
}

function code_1_28() {
  const array = [1, 2, 3];
  const [first, second] = array;

  console.log(first); // 1
  console.log(second); // 2
}

function code_1_29() {
  const array = [1, 2, 3, 4];
  const [head, ...tail] = array;

  console.log(head); // 1
  console.log(tail); // [2, 3, 4]
}

function code_1_30() {
  const map = new Map();
  map.set('a', 1);
  map.set('b', 2);
  map.set('c', 3);
  for (const [key, value] of map.entries()) {
    console.log(`${key}: ${value}`);
  }
  // a: 1
  // b: 2
  // c: 3
}

function code_1_31() {
  const array = [0, ...naturals(3)];
  console.log(array); // [0, 1, 2, 3];
}

function code_1_32_33_34() {
  function* map<A, B>(
    f: (value: A) => B, iterable: Iterable<A>
  ): IterableIterator<B> {
    for (const value of iterable) {
      yield f(value);
    }
  }

  const array = [1, 2, 3, 4];
  const mapped: IterableIterator<number> = map((x) => x * 2, array);
  const iterator = mapped[Symbol.iterator]();

  console.log(mapped.next().value); // 2
  console.log(iterator.next().value); // 4
  console.log([...iterator]); // [6, 8]

  let acc = 0;
  for (const num of map((x) => x * 2, naturals(4))) {
    acc += num;
  }
  console.log(acc); // 20
}

export function main() {
  code_1_15_16();
  code_1_17();
  code_1_19();
  code_1_20();
  code_1_21_22_23_24();
  code_1_25();
  code_1_26();
  code_1_27();
  code_1_28();
  code_1_29();
  code_1_30();
  code_1_31();
  code_1_32_33_34();
}
