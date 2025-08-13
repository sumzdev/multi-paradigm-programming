export function lesson3_3() {
  function* filter<A>(f: (a: A) => boolean, iterable: Iterable<A>): IterableIterator<A> {
    for (const a of iterable) {
      if (f(a)) {
        yield a;
      }
    }
  }

  const array = [1, 2, 3, 4];
  const filtered = filter(a => a % 2 === 0, array);

  const array2: number[] = [...filtered];
  console.log(array2);
}
