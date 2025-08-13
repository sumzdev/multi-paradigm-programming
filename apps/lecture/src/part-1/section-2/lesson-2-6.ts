export function lesson2_6() {
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

  class StringsIterator implements Iterator<string> {
    private index = 0;

    constructor(private array: string[]) {}

    next(): IteratorResult<string> {
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

  const iterator2 = new StringsIterator(['A', 'B', 'C']);
  const result2 = iterator2.next();
  if (result2.done) {
    const value = result2.value;
  } else {
    const value = result2.value;
  }
  console.log(result2);
  console.log(iterator2.next());
  console.log(iterator2.next());
  console.log(iterator2.next());
}