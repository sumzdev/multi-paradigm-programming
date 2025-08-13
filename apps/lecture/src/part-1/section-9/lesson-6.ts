import { fx } from '../../lib/fx1';

export function lesson6() {
  // 9.6 Implementing `some` and `every` via List Processing

  const isOdd = (a: number) => a % 2 === 1;

  // function some<A>(f: (a: A) => boolean, iterable: Iterable<A>): boolean {
  //   return fx(iterable)
  //     .filter(f)
  //     .take(1)
  //     .toArray()
  //     .length > 0;
  // }

  function some<A>(f: (a: A) => boolean, iterable: Iterable<A>): boolean {
    return fx(iterable)
      .map(f)
      .filter(a => a)
      .take(1)
      .reduce((a, b) => a || b, false);
  }

  console.log(some(isOdd, [2, 5, 6]));
  // true
  console.log(some(isOdd, [2, 4, 6]));
  // false

  function every<A>(f: (a: A) => boolean, iterable: Iterable<A>): boolean {
    return fx(iterable)
      .filter(a => !f(a))
      .take(1)
      .toArray()
      .length === 0;
  }

  // console.log(every(isOdd, [1, 3, 5]));
  // true
  // console.log(every(isOdd, [1, 2, 5, 4, 6, 7, 8]));
  // false
}

