export function lesson3_1() {
  // 6.3 Applying Types to map, filter, and forEach

  function forEach<A>(f: (a: A) => void, iterable: Iterable<A>) {
    for (const a of iterable) {
      f(a);
    }
  }

  const array = [1, 2, 3];
  forEach(n => console.log(n), array);

  const set = new Set([10, 30, 30]);
  forEach(n => console.log(n.toFixed(2)), set);

  forEach(n => console.log(n), ['a', 'b']);
}
