export function lesson2() {
  // 4.2 Built-in Iterables — Array, Set, Map
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

  const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
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