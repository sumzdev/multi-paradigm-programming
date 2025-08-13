function* concat<T>(...iterables: Iterable<T>[]): IterableIterator<T> {
  for (const iterable of iterables) {
    for (const a of iterable) {
      yield a;
    }
  }
}

export function lesson9() {
  // 9.9 Using `concat` Together with `take` and `some`
  code1();
  code2();
}

function code1() {
  const iter = limitedConcat(
    7,
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10]
  );
  console.log([...iter]);

  const iter2 = limitedConcat(
    3,
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10]
  );
  console.log([...iter2]);
}

function limitedConcat(limit: number, arr1: number[], arr2: number[]) {
  return take(limit, concat(arr1, arr2));
}

function* take<A>(limit: number, iterable: Iterable<A>): IterableIterator<A> {
  for (const a of iterable) {
    yield a;
    if (--limit === 0) break;
  }
}

function code2() {
  const arr = [3, 4, 5];
  console.log(some(n => n < 3, arr));
  // false

  const iter = concat([1, 2], arr);
  console.log(some(n => n < 3, iter));
  // true
}

function some<A>(f: (a: A) => boolean, iterable: Iterable<A>): boolean {
  return Iterator.from(iterable).some(f);
}