export function lesson2_5() {
  // 2.2 Creating an Iterator from an Array
  class NumbersIterator implements Iterator<number> {
    private index = 0;

    constructor(private array: number[]) {}

    next(): IteratorResult<number> {
      return this.index === this.array.length
        ? { done: true, value: undefined }
        : { done: false, value: this.array[this.index++] };
    }
  }

  const iterator = new NumbersIterator([10, 20, 30]);
  const result = iterator.next();
  if (result.done) {
    const value = result.value;
  } else {
    const value = result.value;
  }
  console.log(result);
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
}