export function lesson2_4() {
  // 2.2 Creating an Iterator from an Array
  class NumbersIterator implements Iterator<number> {
    private index = 0;

    constructor(private array: number[]) {}

    next(): IteratorResult<number> {
      return { done: false, value: this.array[this.index++] };
    }
  }

  const iterator = new NumbersIterator([10, 20, 30]);
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
}