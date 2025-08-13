export function lesson1_1() {
  // Section 3. Generator Functions for Building Iterators in Imperative Programming
  // 3.1 Basic Generator Syntax
  function* generator() {
    yield 1;
    yield 2;
    yield 3;
  }

  const iterator = generator();
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
}