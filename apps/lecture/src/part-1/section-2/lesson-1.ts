export function lesson1() {
  // Section 2. The Iterator Pattern in OOP and First-Class Functions
  // 2.1 GoF’s Iterator Pattern
  interface IteratorYieldResult<T> {
    done?: false;
    value: T;
  }

  interface IteratorReturnResult {
    done: true;
    value: undefined;
  }

  type IteratorResult<T> = IteratorYieldResult<T> | IteratorReturnResult;

  interface Iterator<T> {
    next(): IteratorResult<T>;
  }
}