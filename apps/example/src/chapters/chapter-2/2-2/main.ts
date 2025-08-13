function code_2_18() {
  function forEach<A>(f: (a: A) => void, iterable: Iterable<A>): void {
    for (const a of iterable) {
      f(a);
    }
  }

  const array = [1, 2, 3];
  forEach(a => console.log(a.toFixed(2)), array); // [a: number]
// 1.00
// 2.00
// 3.00
}


function code_2_19() {
  function* map<A, B>(f: (a: A) => B, iterable: Iterable<A>): IterableIterator<B> {
    for (const a of iterable) {
      yield f(a);
    }
  }

  const array = ['1', '2', '3'];
  const mapped = map(a => parseInt(a), array); // [a: string]
  // [const mapped: IterableIterator<number>]
  const array2: number[] = [...mapped];
  console.log(array2);
  // [1, 2, 3]

  const [head] = map(a => a.toUpperCase(), ['a', 'b', 'c']);
  console.log(head); // [head: string]
  // A
}

function code_2_20() {
  function* filter<A>(f: (a: A) => boolean, iterable: Iterable<A>): IterableIterator<A> {
    for (const a of iterable) {
      if (f(a)) {
        yield a;
      }
    }
  }

  const array = [1, 2, 3, 4];
  const filtered = filter(a => a % 2 === 0, array); // [a: number]

  const array2: number[] = [...filtered]; // [const filtered: IterableIterator<number>]
  console.log(array2); // [2, 4]
}

function code_2_21() {
  function reduce<A, Acc>(
    f: (acc: Acc, a: A) => Acc, acc: Acc, iterable: Iterable<A>
  ): Acc {
    for (const a of iterable) {
      acc = f(acc, a);
    }
    return acc;
  }

  const array = [1, 2, 3];
  const sum = reduce((acc, a) => acc + a, 0, array);
  console.log(sum); // [const sum: number]
  // 6

  const strings = ['a', 'b', 'c'];
  const abc = reduce((acc, a) => `${acc}${a}`, '', strings);
  console.log(abc); // [const abc: string]
  // abc
}


// [2-22]

function baseReduce<A, Acc>(
  f: (acc: Acc, a: A) => Acc, acc: Acc, iterator: Iterator<A>
): Acc {
  while (true) {
    const { done, value } = iterator.next();
    if (done) break;
    acc = f(acc, value);
  }
  return acc;
}

// (1)
function reduce<A, Acc>(
  f: (acc: Acc, a: A) => Acc, acc: Acc, iterable: Iterable<A>
): Acc;
// (2)
function reduce<A, Acc>(
  f: (a: A, b: A) => Acc, iterable: Iterable<A>
): Acc;
function reduce<A, Acc>(
  f: (a: Acc | A, b: A) => Acc,
  accOrIterable: Acc | Iterable<A>,
  iterable?: Iterable<A>
): Acc {
  if (iterable === undefined) {
    const iterator = (accOrIterable as Iterable<A>)[Symbol.iterator]();
    const { done, value: acc } = iterator.next();
    if (done) throw new TypeError("'reduce' of empty iterable with no initial value");
    return baseReduce(f, acc, iterator) as Acc;
  } else {
    return baseReduce(f, accOrIterable as Acc, iterable[Symbol.iterator]());
  }
}

function code_2_22a() {
  // 첫 번째 reduce 함수: 초기값을 포함한 예제
  const array = [1, 2, 3];
  const sum = reduce((acc, a) => acc + a, 0, array);
  console.log(sum); // [const sum: number]
  // 6

  const strings = ['a', 'b', 'c'];
  const abc = reduce((acc, a) => `${acc}${a}`, '', strings);
  console.log(abc); // [const abc: string]
  // abc

  // 두 번째 reduce 함수: 초기값을 포함하지 않은 예제
  const array2 = [1, 2, 3];
  const sum2 = reduce((a, b) => a + b, array2);
  console.log(sum2); // [const sum2: number]
  // 6

  const words = ['hello', 'beautiful', 'world'];
  const sentence = reduce((a, b) => `${a} ${b}`, words);
  console.log(sentence); // [const sentence: string]
  // hello beautiful world

  const array3 = [3, 2, 1];
  const str = reduce((a, b) => `${a}${b}`, array3);
  console.log(str); // [const str: string]
  // 321
}

function code_2_23() {
  function* naturals(end = Infinity): IterableIterator<number> {}
  function forEach<A>(f: (a: A) => void, iterable: Iterable<A>): void {}
  function* map<A, B>(f: (a: A) => B, iterable: Iterable<A>): IterableIterator<B> {}
  function* filter<A>(f: (a: A) => boolean, iterable: Iterable<A>): IterableIterator<A> {}

  function printNumber(n: number) {
    return console.log(n);
  }

  forEach(printNumber,
    map(n => n * 10, // [n: number]
      filter(n => n % 2 === 1, // [n: number]
        naturals(5))));

  forEach(printNumber,
    filter(n => n % 2 === 1, // [n: number]
      map(text => parseInt(text), // [text: string]
        map(el => el.textContent!, // [el: HTMLDivElement] [textContent: string | null]
          document.querySelectorAll('div')))));
}

export function main() {
  code_2_18();
  code_2_19();
  code_2_20();
  code_2_21();
  code_2_22a();
  code_2_23();
}
