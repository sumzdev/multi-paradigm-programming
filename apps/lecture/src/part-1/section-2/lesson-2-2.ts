export function lesson2_2() {
  // 2.2 Creating an Iterator from an Array
  class NumbersIterator implements Iterator<number> {
    constructor(private array: number[]) {}

    next(): IteratorResult<number> {
      return { done: false, value: this.array[0] };
    }
  }

  new NumbersIterator([10, 20, 30]);
}