export function lesson1_2() {
  // Section 3. Generator Functions for Building Iterators in Imperative Programming
  // 3.1 Basic Generator Syntax
  function* generator(bool: boolean) {
    yield 1;
    if (bool) {
      yield 2;
    }
    yield 3;
  }

  const iterator = generator(true);
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());

  const iterator2 = generator(false);
  console.log(iterator2.next());
  console.log(iterator2.next());
  console.log(iterator2.next());
}