export function lesson3_1() {
  // 2.3 An Iterator That Generates Infinite Sequences
  class ArrayIterator<T> implements Iterator<T> {
    private index = 0;

    constructor(private array: T[]) {}

    next(): IteratorResult<T> {
      return this.index === this.array.length
       ? { done: true, value: undefined }
       : { done: false, value: this.array[this.index++] };
    }
  }

  const iter = new ArrayIterator([10, 20]);
  console.log(iter.next());
  console.log(iter.next());

  function naturals(): Iterator<number> {
    let i = 1;
    return {
      next() {
        return { done: false, value: i++ };
      }
    }
  }

  const iter2 = naturals();
  console.log(iter2.next());
  console.log(iter2.next());
}