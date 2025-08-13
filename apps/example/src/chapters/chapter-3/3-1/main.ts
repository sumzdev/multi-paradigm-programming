import { filter, fx, map, reduce, take } from '../../../lib/fx2';

function code_3_1() {
  function sumOfSquaresOfOddNumbers(limit: number, list: number[]): number {
    let acc = 0;
    for (const a of list) {
      if (a % 2 === 1) {
        const b = a * a;
        acc += b;
        if (--limit === 0) break;
      }
    }
    return acc;
  }

  console.log(
    sumOfSquaresOfOddNumbers(3, [1, 2, 3, 4, 5, 6, 7, 8, 9])
  );
  // 35
}

function code_3_2() {
  function sumOfSquaresOfOddNumbers(limit: number, list: number[]): number {
    let acc = 0;
    for (const a of filter(a => a % 2 === 1, list)) {
      const b = a * a;
      acc += b;
      if (--limit === 0) break;
    }
    return acc;
  }

  console.log(
    sumOfSquaresOfOddNumbers(3, [1, 2, 3, 4, 5, 6, 7, 8, 9])
  );
  // 35
}

function code_3_3() {
  function sumOfSquaresOfOddNumbers(limit: number, list: number[]): number {
    let acc = 0;
    for (const a of map(a => a * a, filter(a => a % 2 === 1, list))) {
      acc += a;
      if (--limit === 0) break;
    }
    return acc;
  }

  console.log(
    sumOfSquaresOfOddNumbers(3, [1, 2, 3, 4, 5, 6, 7, 8, 9])
  );
  // 35
}

function code_3_5() {
  function* take<A>(limit: number, iterable: Iterable<A>): IterableIterator<A> {
    const iterator = iterable[Symbol.iterator]();
    while (true) {
      const { value, done } = iterator.next();
      if (done) break;
      yield value;
      if (--limit === 0) break;
    }
  }

  function sumOfSquaresOfOddNumbers(limit: number, list: number[]): number {
    let acc = 0;
    for (const a of take(limit, map(a => a * a, filter(a => a % 2 === 1, list)))) {
      acc += a;
    }
    return acc;
  }

  console.log(
    sumOfSquaresOfOddNumbers(3, [1, 2, 3, 4, 5, 6, 7, 8, 9])
  );
  // 35
}

function code_3_6() {
  const sumOfSquaresOfOddNumbers = (limit: number, list: number[]): number =>
    reduce((a, b) => a + b, 0,
      take(limit,
        map(a => a * a,
          filter(a => a % 2 === 1, list))));

  console.log(
    sumOfSquaresOfOddNumbers(3, [1, 2, 3, 4, 5, 6, 7, 8, 9])
  );
  // 35
}

function code_3_7() {
  // 함수형 코드:
  const sumOfSquaresOfOddNumbers = (limit: number, list: number[]): number =>
    fx(list)
      .filter(a => a % 2 === 1)
      .map(a => a * a)
      .take(limit)
      .reduce((a, b) => a + b, 0);

  console.log(
    sumOfSquaresOfOddNumbers(3, [1, 2, 3, 4, 5, 6, 7, 8, 9])
  );
  // 35
}

export function main() {
  code_3_1();
  code_3_2();
  code_3_3();
  code_3_5();
  code_3_6();
  code_3_7();
}
