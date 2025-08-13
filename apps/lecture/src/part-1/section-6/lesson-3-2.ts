export function lesson3_2() {
  function* map<A, B>(f: (a: A) => B, iterable: Iterable<A>): IterableIterator<B> {
    for (const a of iterable) {
      yield f(a);
    }
  }

  const array = ['1', '2', '3'];
  const mapped = map(a => parseInt(a), array);
  const array2 = [...mapped];
  console.log(array2);

  const [head] = map(a => a.toFixed(2), [1, 2, 3]);
  console.log(head);
}
