
export function lesson4() {
  // 6.4 The `reduce` Function and Function Overloading

  function baseReduce<A, Acc>(
    f: (acc: Acc, a: A) => Acc,
    acc: Acc,
    iterator: Iterator<A>
  ): Acc {
    while (true) {
      const { done, value: a } = iterator.next();
      if (done) break;
      acc = f(acc, a);
    }
    return acc;
  }

  function reduce<A, Acc>(
    f: (a: A, b: A) => Acc,
    iterable: Iterable<A>
  ): Acc;
  function reduce<A, Acc>(
    f: (acc: Acc, a: A) => Acc,
    acc: Acc,
    iterable: Iterable<A>
  ): Acc;
  function reduce<A, Acc>(
    f: (acc: A | Acc, a: A) => Acc,
    accOrIterable: Acc | Iterable<A>,
    iterable?: Iterable<A>
  ): Acc {
    if (iterable === undefined) {
      iterable = accOrIterable as Iterable<A>;
      const iterator = iterable[Symbol.iterator]();
      const { done, value: acc } = iterator.next();
      if (done) throw new TypeError("'reduce' of empty iterable with no initial value");
      return baseReduce(f, acc, iterator) as Acc;
    } else {
      return baseReduce(f, accOrIterable as Acc, iterable[Symbol.iterator]());
    }
  }
  //
  // const result = reduce((acc, a) => acc + a, 10, [1, 2, 3]);
  // console.log(result);
  //
  // const result2 = reduce((total, img) => total + img.height, 0, [
  //   { height: 50 },
  //   { height: 100 },
  //   { height: 200 },
  // ]);
  // console.log(result2);
  //
  // const result3 = reduce((a, b) => a + b, [1, 2, 3]);
  // console.log(result3);
  //
  // const result4 = reduce((a, b) => `${a},${b}`, [1, 2, 3]);
  // console.log(result4);
}
