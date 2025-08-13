import { fx, range } from '@fxts/core';

export function lesson2() {
  // 11.2 Collatz Conjecture: Counting Until It Becomes 1
  function* repeatApply<A>(f: (acc: A) => A, acc: A) {
    while (true) {
      acc = f(acc);
      yield acc;
    }
  }

  function count(start = 1) {
    return range(start, Infinity);
  }

  function withCount<A>(iterable: Iterable<A>) {
    return fx(iterable)
      .zip(count(1))
      .map(([count, value]) => ({ count, value }))
  }

  function nextCollatz(num: number) {
    return num % 2 === 0
      ? num / 2
      : num * 3 + 1
  }

  const collatzCount = (num: number) =>
    fx(repeatApply(nextCollatz, num))
      .chain(withCount)
      .find(({ value }) => value === 1)!
      .count;

  console.log(collatzCount(1)); // 3
  console.log(collatzCount(4)); // 2
  console.log(collatzCount(5)); // 5
}
