export function lesson4_2() {
  // 4.4 Iterator, Generator, Iterable
  function* naturals(end = Infinity) {
    let n = 1;
    while (n <= end) {
      yield n++;
    }
  }

  function* map<A, B>(f: (value: A) => B, iterable: Iterable<A>) {
    for (const value of iterable) {
      yield f(value);
    }
  }

  const mapped = map((x) => x * 2, naturals(4));

  let acc = 0;
  for (const num of mapped) {
    acc += num;
  }
  console.log(acc); // 20

  console.log(
    [...map(a => a * 10, [1, 2, 3, 4])]
  ); // [10, 20, 30, 40]
}