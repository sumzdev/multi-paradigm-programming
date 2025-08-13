export function lesson1_1() {
  // Section 4. Iteration Protocol
  // 4.1 Iterators and Iterables
  function naturals(end = Infinity): IterableIterator<number> {
    let n = 1;
    return {
      next() {
        return n <= end
          ? { value: n++, done: false }
          : { value: undefined, done: true };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  }

  const iter1 = naturals(3);
  for (const a of iter1) {
    console.log(a);
  }
  const iterable = naturals(2);
  const iter2 = iterable[Symbol.iterator]();
  console.log(iter2.next());
  console.log(iter2.next());
  console.log(iter2.next());

  const array = [1, 2];
  for (const a of array) {
    console.log(a);
  }
  const iter3 = array[Symbol.iterator]();
  console.log(iter3.next());
  console.log(iter3.next());
  console.log(iter3.next());
}

function interfaceIterator() {

  interface Iterator<T> {
    next(): IteratorResult<T>;
  }

  interface Iterable<T> {
    [Symbol.iterator](): Iterator<T>;
  }

  interface IterableIterator<T> extends Iterator<T> {
    [Symbol.iterator](): IterableIterator<T>;
  }

}