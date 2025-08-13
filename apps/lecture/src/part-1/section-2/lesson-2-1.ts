export function lesson2_1() {
  // 2.2 Creating an Iterator from an Array
  class NumbersIterator {
    private array: number[];

    constructor(array: number[]) {
      this.array = array;
    }
  }

  new NumbersIterator([10, 20, 30]);
}
