function code_1_10() {
  function* generator() {
    yield 1;
    yield 2;
    yield 3;
  }

  const iter = generator();

  console.log(iter.next()); // { value: 1, done: false }
  console.log(iter.next()); // { value: 2, done: false }
  console.log(iter.next()); // { value: 3, done: false }
  console.log(iter.next()); // { value: undefined, done: true }
}

function code_1_10a() {
  function* generator() {
    yield 1;
    console.log('hi');
    yield 2;
    yield 3;
  }

  const iter = generator();

  console.log(iter.next());
  // { value: 1, done: false }
  console.log(iter.next()); // hi
  // { value: 2, done: false }
  console.log(iter.next());
  // { value: 3, done: false }
  console.log(iter.next());
  // { value: undefined, done: true }
}

function code_1_11_11a() {
  function* generator(condition: boolean) {
    yield 1;
    if (condition) {
      yield 2;
    }
    yield 3;
  }

  const iter1 = generator(false);

  console.log(iter1.next()); // { value: 1, done: false }
  console.log(iter1.next()); // { value: 3, done: false }
  console.log(iter1.next()); // { value: undefined, done: true }

  const iter2 = generator(true);

  console.log(iter2.next()); // { value: 1, done: false }
  console.log(iter2.next()); // { value: 2, done: false }
  console.log(iter2.next()); // { value: 3, done: false }
  console.log(iter2.next()); // { value: undefined, done: true }
}

function code_1_12() {
  function* generator() {
    yield 1;
    yield* [2, 3];
    yield 4;
  }

  const iter = generator();

  console.log(iter.next()); // { value: 1, done: false }
  console.log(iter.next()); // { value: 2, done: false }
  console.log(iter.next()); // { value: 3, done: false }
  console.log(iter.next()); // { value: 4, done: false }
  console.log(iter.next()); // { value: undefined, done: true }
}

function code_1_13() {
  function* naturals() {
    let n = 1;
    while (true) {
      yield n++;
    }
  }

  const iter = naturals();

  console.log(iter.next()); // { value: 1, done: false }
  console.log(iter.next()); // { value: 2, done: false }
  console.log(iter.next()); // { value: 3, done: false }
  // 계속해서 호출할 수 있습니다.
}

function code_1_14() {
  function* reverse<T>(arrayLike: ArrayLike<T>): IterableIterator<T> {
    let idx = arrayLike.length;
    while (idx--) {
      yield arrayLike[idx];
    }
  }

  const array = ['A', 'B', 'C', 'D', 'E', 'F'];
  const reversed = reverse(array);

  console.log(reversed.next().value); // F
  console.log(reversed.next().value); // E
  console.log(reversed.next().value); // D
}

export function main() {
  code_1_10();
  code_1_10a();
  code_1_11_11a();
  code_1_12();
  code_1_13();
  code_1_14();
}
