export function lesson2() {
  // 3.2 The `naturals` Generator Function for Creating Infinite Sequences
  function* naturals() {
    let n = 1;
    while (true) {
      yield n++;
    }
  }

  const iterator = naturals();
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
}