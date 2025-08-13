import { fx } from '../../lib/fx1';

export function lesson7() {
  // 9.7 Iterator Helpers

  function* naturals(end = Infinity) {
    let n = 1;
    while (n <= end) {
      yield n++;
    }
  }

  Iterator.from(naturals(Infinity))
    .map(a => a + 10)
    .filter(a => a % 2 === 1)
    .take(5)
    .forEach(a => console.log(a));

  const iterator = Iterator.from(naturals(Infinity));
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());

  const iter2 = Iterator.from([1, 2, 3, 4, 5]);

  iter2
    .map(a => a + 10)
    .filter(a => a % 2 === 1)
    .take(5)
    .forEach(a => console.log(a));

}
