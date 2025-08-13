// [1-2]
class ArrayLikeIterator<T> implements Iterator<T> {
  private index = 0;
  constructor(private arrayLike: ArrayLike<T>) {}

  next(): IteratorResult<T> {
    if (this.index < this.arrayLike.length) {
      return {
        value: this.arrayLike[this.index++],
        done: false,
      };
    } else {
      return {
        value: undefined,
        done: true,
      };
    }
  }
}

function code_1_2() {
  const arrayLike: ArrayLike<number> = {
    0: 10,
    1: 20,
    2: 30,
    length: 3,
  };

  const iterator: Iterator<number> = new ArrayLikeIterator(arrayLike);

  console.log(iterator.next()); // { value: 10, done: false }
  console.log(iterator.next()); // { value: 20, done: false }
  console.log(iterator.next()); // { value: 30, done: false }
  console.log(iterator.next()); // { value: undefined, done: true }
}

function code_1_3() {
  const array: Array<string> = ['a', 'b', 'c'];
  const iterator2: Iterator<string> = new ArrayLikeIterator(array);

  console.log(iterator2.next()); // { value: 'a', done: false }
  console.log(iterator2.next()); // { value: 'b', done: false }
  console.log(iterator2.next()); // { value: 'c', done: false }
  console.log(iterator2.next()); // { value: undefined, done: true }
}

function code_1_4() {
  const array = ['A', 'B'];
  array.reverse();
  console.log(array[0], array[1]); // 'B', 'A'
}

// 1-5
function reverse<T>(arrayLike: ArrayLike<T>): Iterator<T> {
  let idx = arrayLike.length;
  return {
    next() {
      if (idx-- >= 0) {
        return { value: arrayLike[idx], done: false };
      } else {
        return { value: undefined, done: true };
      }
    },
  };
}

function code_1_5() {
  const array = ['A', 'B'];
  const reversed = reverse(array);
  console.log(array); // ['A', 'B']

  console.log(reversed.next().value, reversed.next().value);
  // 'B', 'A'
}

function code_1_6() {
  const array = ['A', 'B', 'C', 'D', 'E', 'F'];
  array.reverse();
  console.log(array); // ['F', 'E', 'D', 'C', 'B', 'A']
  console.log(array[0], array[1]); // 'F', 'E'

  const array2 = ['A', 'B', 'C', 'D', 'E', 'F'];
  const reversed = reverse(array2);
  console.log(array2); // ['A', 'B', 'C', 'D', 'E', 'F']
  console.log(reversed.next().value, reversed.next().value); // 'F', 'E'
}

function code_1_7() {
  const array = ['A', 'B', 'C', 'D', 'E', 'F'];
  const reversed = [...array].reverse();
  console.log(reversed[0], reversed[1], array[0], array[1]);
  // 'F', 'E', 'A', 'B'

  const array2 = ['A', 'B', 'C', 'D', 'E', 'F'];
  const reversed2 = reverse(array2);
  console.log(reversed2.next().value, reversed2.next().value, array2[0], array2[1]);
  // 'F', 'E', 'A', 'B'
}

// [1-8]
function map<A, B>(transform: (value: A) => B, iterator: Iterator<A>): Iterator<B> {
  return {
    next(): IteratorResult<B> {
      const { value, done } = iterator.next();
      return done ? { value, done } : { value: transform(value), done };
    },
  };
}

function code_1_8() {
  const array = ['A', 'B', 'C', 'D', 'E', 'F'];
  const iterator = map((str) => str.toLowerCase(), reverse(array));
  console.log(iterator.next().value, iterator.next().value); // f e
}

export function main() {
  code_1_2();
  code_1_3();
  code_1_4();
  code_1_5();
  code_1_6();
  code_1_7();
  code_1_8();
}
