import { forEach } from './lib';

export function lesson2_3() {
  // 5.2 map Function (iterator)

  function* naturals(end = Infinity) {
    let n = 1;
    while (n <= end) {
      yield n++;
    }
  }

  function map(f, iterable): any {
    const iterator = iterable[Symbol.iterator]();
    return {
      next() {
        const { done, value } = iterator.next();
        return done
          ? { done, value }
          : { done, value: f(value) };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
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
