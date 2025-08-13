import { forEach } from './lib';

export function lesson2_2() {
  // 5.2 map Function (while)

  function* naturals(end = Infinity) {
    let n = 1;
    while (n <= end) {
      yield n++;
    }
  }

  function* map(f, iterable) {
    const iterator = iterable[Symbol.iterator]();
    while (true) {
      const { done, value } = iterator.next();
      if (done) break;
      yield f(value);
    }
  }

  const array = [1, 2, 3];
  const mapped = map(x => x * 2, array);
  console.log([...mapped]); // [2, 4, 6]

  const mapped2 = map(x => x * 3, naturals(3));
  forEach(console.log, mapped2);
  // 3
  // 6
  // 9
}
